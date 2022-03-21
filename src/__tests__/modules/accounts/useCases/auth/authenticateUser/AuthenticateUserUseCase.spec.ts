import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      null,
    );

    createUserUseCase = new CreateUserUseCase(usersRepository, null);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.user.deleteMany();
  });

  it('should be able to authenticate a user', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test 1',
      username: 'user_test1',
      email: 'user1@test.com',
      password: '123456',
      activated: true,
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a none existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect', 401));
  });

  it('should not be able to authenticate a user with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test 2',
      username: 'user_test2',
      email: 'user2@test.com',
      password: '123456',
      activated: true,
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect', 401));
  });

  it('should not be able to authenticate a user not activated', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test 3',
      username: 'user_test3',
      email: 'user3@test.com',
      password: '123456',
      activated: false,
    };

    const createdUser = await createUserUseCase.execute(user);

    const vinculedTokens = await usersTokensRepository.findByUserId(
      createdUser.id,
    );

    await authenticateUserUseCase.deleteActivateAccountTokens(vinculedTokens);

    const newVinculedTokens = await usersTokensRepository.findByUserId(
      createdUser.id,
    );

    expect(
      newVinculedTokens.filter(token => token.type === 'activate_account'),
    ).toHaveLength(0);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toEqual(new AppError('User not activated', 401));
  });
});
