import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { RefreshTokenUseCase } from '@modules/accounts/useCases/auth/refreshToken/RefreshTokenUseCase';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { createFakeUser } from '@utils/testUtils';

let authenticateUserUseCase: AuthenticateUserUseCase;
let refreshTokenUseCase: RefreshTokenUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;
let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;

describe('Refresh Token', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = { sendMail: jest.fn() };

    sendActivateAccountMailUseCase = new SendActivateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );

    refreshTokenUseCase = new RefreshTokenUseCase(
      usersTokensRepository,
      usersRepository,
      dateProvider,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      sendActivateAccountMailUseCase,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      sendActivateAccountMailUseCase,
    );
  });

  it('should be able to refresh a token', async () => {
    const user = await createFakeUser();

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
      new AppError('Invalid token', 401, 'token.invalid'),
    );
  });

  it('should not be able to refresh a token with a non existent token', async () => {
    await expect(
      refreshTokenUseCase.execute(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWNrLmNhcGl0b0Bob3RtYWlsLmNvbSIsImlhdCI6MTY1MTQ1MjU3MywiZXhwIjoyMjgyNjA0NTczLCJzdWIiOiIxIn0.CJzTwZZD8UCyS13Nxebk-m-ZuldW2XK95qEq505kpo0',
      ),
    ).rejects.toEqual(new AppError('Token not found', 401, 'token.invalid'));
  });
});
