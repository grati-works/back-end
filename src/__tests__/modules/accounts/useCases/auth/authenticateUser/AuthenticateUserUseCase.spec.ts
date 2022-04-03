import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailTrapMailProvider } from '@shared/container/providers/MailProvider/implementations/MailTrapMailProvider';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';
import { faker } from '@faker-js/faker';
import { v4 as uuidV4 } from 'uuid';
import { createFakeUser } from '@utils/testUtils';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: MailTrapMailProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailTrapMailProvider();

    sendActivateAccountMailUseCase = new SendActivateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      sendActivateAccountMailUseCase,
    );

    createUserUseCase = new CreateUserUseCase(usersRepository, null);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.user.deleteMany();
  });

  it('should be able to authenticate a user', async () => {
    const user = createFakeUser();

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
        password: faker.internet.password(),
      }),
    ).rejects.toEqual(
      new AppError('Email or password incorrect', 401, 'auth.incorrect'),
    );
  });

  it('should not be able to authenticate a user with incorrect password', async () => {
    const user = createFakeUser();

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toEqual(
      new AppError('Email or password incorrect', 401, 'auth.incorrect'),
    );
  });

  it('should not be able to authenticate a user not activated', async () => {
    const user = createFakeUser(false);

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
    ).rejects.toEqual(
      new AppError('User not activated', 403, 'auth.not_activated'),
    );
  });

  it('should be check if usersTokensRepository.deleteById have been called', async () => {
    const user = createFakeUser();

    const createdUser = await createUserUseCase.execute(user);

    await usersTokensRepository.create({
      user_id: createdUser.id,
      token: uuidV4(),
      type: 'activate_account',
      expires_at: dateProvider.addHours(3),
    });

    const vinculedTokens = await usersTokensRepository.findByUserId(
      createdUser.id,
    );

    const spyDeleteById = jest.spyOn(usersTokensRepository, 'deleteById');

    await authenticateUserUseCase.deleteActivateAccountTokens(vinculedTokens);

    expect(spyDeleteById).toHaveBeenCalled();
  });
});
