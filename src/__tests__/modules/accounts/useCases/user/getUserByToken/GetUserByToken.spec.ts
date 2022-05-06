import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { GetUserByTokenUseCase } from '@modules/accounts/useCases/user/getUserByToken/GetUserByTokenUseCase';
import { createFakeUser } from '@utils/testUtils';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let getUserByTokenUseCase: GetUserByTokenUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: IMailProvider;

describe('Get User By Token', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = { sendMail: jest.fn() };

    getUserByTokenUseCase = new GetUserByTokenUseCase(usersRepository);

    sendActivateAccountMailUseCase = new SendActivateAccountMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to get user by token', async () => {
    const user = await createFakeUser(false);

    const createdUser = await usersRepository.create(user);

    const activateToken = await sendActivateAccountMailUseCase.execute(
      user.email,
    );

    const gettedUser = await getUserByTokenUseCase.execute(
      activateToken,
      'activate_account',
    );

    expect(gettedUser.id).toBe(createdUser.id);
  });

  it('should not be able to get user by inexistent token', async () => {
    const user = await createFakeUser(false);

    await usersRepository.create(user);

    await expect(
      getUserByTokenUseCase.execute('activateToken', 'activate_account'),
    ).rejects.toEqual(new AppError('User not found', 404, 'user.not_found'));
  });
});
