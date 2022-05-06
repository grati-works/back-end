import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { ActivateAccountUseCase } from '@modules/accounts/useCases/user/activateAccount/ActivateAccountUseCase';
import { createFakeUser } from '@utils/testUtils';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let activateAccountUseCase: ActivateAccountUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: IMailProvider;

describe('Activate Account', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = { sendMail: jest.fn() };

    activateAccountUseCase = new ActivateAccountUseCase(
      usersTokensRepository,
      dateProvider,
      usersRepository,
    );

    sendActivateAccountMailUseCase = new SendActivateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepository,
      sendActivateAccountMailUseCase,
    );
  });

  it('should be able to activate user account', async () => {
    const user = await createFakeUser();

    const createdUser = await createUserUseCase.execute(user);

    const activateToken = await sendActivateAccountMailUseCase.execute(
      user.email,
    );

    await client.userTokens.deleteMany({
      where: {
        user_id: createdUser.id,
        token: activateToken,
      },
    });

    await client.userTokens.create({
      data: {
        user: {
          connect: {
            id: createdUser.id,
          },
        },
        token: activateToken,
        created_at: new Date(),
        expires_at: new Date(dateProvider.addHours(3)),
        type: 'activate_account',
      },
    });

    const activateAccount = jest.spyOn(usersRepository, 'activate');

    await activateAccountUseCase.execute(activateToken);

    expect(activateAccount).toHaveBeenCalledWith(createdUser.id);
  });

  it('should not be able to activate user account with invalid token', async () => {
    await expect(
      activateAccountUseCase.execute('invalid_token'),
    ).rejects.toEqual(new AppError('Invalid token', 401, 'token.invalid'));
  });

  it('should not be able to activate user account with expired token', async () => {
    const user = await createFakeUser();

    const createdUser = await createUserUseCase.execute(user);

    const activateToken = await sendActivateAccountMailUseCase.execute(
      user.email,
    );

    await client.userTokens.deleteMany({
      where: {
        user_id: createdUser.id,
        token: activateToken,
      },
    });

    await client.userTokens.create({
      data: {
        user: {
          connect: {
            id: createdUser.id,
          },
        },
        token: activateToken,
        created_at: new Date(),
        expires_at: new Date('2020-01-01'),
        type: 'activate_account',
      },
    });

    await expect(activateAccountUseCase.execute(activateToken)).rejects.toEqual(
      new AppError('Token expired', 401, 'token.expired'),
    );
  });

  it('should not be able to activate an inexistent account', async () => {
    const user = await createFakeUser();

    const createdUser = await createUserUseCase.execute(user);

    const activateToken = await sendActivateAccountMailUseCase.execute(
      user.email,
    );

    await client.userTokens.deleteMany({
      where: {
        user_id: createdUser.id,
        token: activateToken,
      },
    });

    await client.userTokens.create({
      data: {
        user: {
          connect: {
            id: createdUser.id,
          },
        },
        token: activateToken,
        created_at: new Date(),
        expires_at: new Date(dateProvider.addHours(3)),
        type: 'activate_account',
      },
    });

    jest
      .spyOn(usersRepository, 'findById')
      .mockImplementation(async () => null);

    await expect(activateAccountUseCase.execute(activateToken)).rejects.toEqual(
      new AppError('User not found', 404, 'user.not_found'),
    );

    jest.clearAllMocks();
  });
});
