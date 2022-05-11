import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { GetAccumulatedPointsUseCase } from '@modules/accounts/useCases/profile/getAccumulatedPoints/GetAccumulatedPointsUseCase';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { createFakeProfile, createFakeUser } from '@utils/testUtils';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let profilesRepository: ProfilesRepository;
let dateProvider: IDateProvider;
let createUserUseCase: CreateUserUseCase;
let getAccumulatedPointsUseCase: GetAccumulatedPointsUseCase;
let mailProvider: IMailProvider;

describe('Get user profile accumulated points', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    profilesRepository = new ProfilesRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = { sendMail: jest.fn() };

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
    getAccumulatedPointsUseCase = new GetAccumulatedPointsUseCase(
      profilesRepository,
      dateProvider,
    );
  });
  it('should not be able to return points if profile does not exist', async () => {
    const user = await createFakeUser();
    const createdUser = await createUserUseCase.execute(user);

    const organization_id = '10';

    await expect(
      getAccumulatedPointsUseCase.execute(
        organization_id,
        createdUser.id.toString(),
      ),
    ).rejects.toEqual(
      new AppError('Profile not found', 404, 'profile.not_found'),
    );
  });

  it('should be able to return points', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const points = await getAccumulatedPointsUseCase.execute(
      organization.id.toString(),
      createdUser.id.toString(),
    );

    expect(points).toBeDefined();
    expect(typeof points).toBe('number');
  });
});
