import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { RefreshTokenUseCase } from '@modules/accounts/useCases/auth/refreshToken/RefreshTokenUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';
import { faker } from '@faker-js/faker';

let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;

describe('Refresh Token', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();

    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepository,
      usersRepository,
      dateProvider,
    );

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

  it('should be able to refresh a token', async () => {
    const name = faker.name.findName();
    const user: ICreateUserDTO = {
      name,
      username: faker.internet.userName(name),
      email: faker.internet.email(name),
      password: faker.internet.password(),
      activated: true,
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    const { refresh_token } = result;

    const newToken = await refreshTokenUseCase.execute(refresh_token);

    expect(newToken).toHaveProperty('token');
    expect(newToken).toHaveProperty('refresh_token');
    expect(newToken).toHaveProperty('user');
  });

  it('should not be able to refresh a token with a invalid token', async () => {
    await expect(refreshTokenUseCase.execute('invalid_token')).rejects.toEqual(
      new AppError('Invalid token', 401),
    );
  });

  it('should not be able to refresh a token with a non existent token', async () => {
    await expect(
      refreshTokenUseCase.execute(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWNrLmNhcGl0b0Bob3RtYWlsLmNvbSIsImlhdCI6MTY0Nzk1NzUzOSwiZXhwIjoxNjUwNTQ5NTM5LCJzdWIiOiIxIn0.J_K4f9aclLKXeV6pYKZUqF3TEjY4aFvBoFJXzgUzZtk',
      ),
    ).rejects.toEqual(new AppError('Token not found', 401));
  });
});
