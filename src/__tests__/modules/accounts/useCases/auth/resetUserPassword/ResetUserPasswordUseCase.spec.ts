import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/auth/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';
import { faker } from '@faker-js/faker';
import { ResetUserPasswordUseCase } from '@modules/accounts/useCases/auth/resetUserPassword/ResetUserPasswordUseCase';
import { SendForgotPasswordMailUseCase } from '@modules/accounts/useCases/mail/sendForgotPasswordMail/SendForgotPasswordMailUseCase';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { createFakeUser } from '@utils/testUtils';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

let authenticateUserUseCase: AuthenticateUserUseCase;
let resetUserPasswordUseCase: ResetUserPasswordUseCase;
let createUserUseCase: CreateUserUseCase;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;
let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;

describe('Reset Password', () => {
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

    resetUserPasswordUseCase = new ResetUserPasswordUseCase(
      usersTokensRepository,
      dateProvider,
      usersRepository,
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

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to reset a password', async () => {
    const user = await createFakeUser();

    await createUserUseCase.execute(user);

    const recoverToken = await sendForgotPasswordMailUseCase.execute(
      user.email,
    );
    const newPassword = faker.internet.password();

    await resetUserPasswordUseCase.execute({
      token: recoverToken,
      password: newPassword,
    });

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: newPassword,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('refresh_token');
    expect(response).toHaveProperty('user');
  });

  it('should not be able to reset a password with invalid token', async () => {
    await expect(
      resetUserPasswordUseCase.execute({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWNrLmNhcGl0b0Bob3RtYWlsLmNvbSIsImlhdCI6MTY0Nzk1NzUzOSwiZXhwIjoxNjUwNTQ5NTM5LCJzdWIiOiIxIn0.J_K4f9aclLKXeV6pYKZUqF3TEjY4aFvBoFJXzgUzZtk',
        password: faker.internet.password(),
      }),
    ).rejects.toEqual(
      new AppError('Invalid token', 401, 'token.resetpassword.invalid'),
    );
  });

  it('should not be able to reset password with expired token', async () => {
    const user = await createFakeUser();

    const createdUser = await createUserUseCase.execute(user);

    const recoverToken = await sendForgotPasswordMailUseCase.execute(
      user.email,
    );

    await client.userTokens.deleteMany({
      where: {
        user_id: createdUser.id,
        token: recoverToken,
      },
    });

    const userToken = await client.userTokens.create({
      data: {
        user: {
          connect: {
            id: createdUser.id,
          },
        },
        token: recoverToken,
        created_at: new Date(),
        expires_at: new Date('2020-01-01'),
        type: 'forgot_password',
      },
    });

    jest
      .spyOn(usersTokensRepository, 'findByRefreshToken')
      .mockImplementation(async () => userToken);

    await expect(
      resetUserPasswordUseCase.execute({
        token: recoverToken,
        password: faker.internet.password(),
      }),
    ).rejects.toEqual(
      new AppError('Token expired', 401, 'token.resetpassword.expired'),
    );
  });

  it('should not be able to reset password with non existent user', async () => {
    const user = await createFakeUser();

    await expect(
      sendForgotPasswordMailUseCase.execute(user.email),
    ).rejects.toEqual(new AppError('User not found', 404, 'user.not_found'));
  });
});
