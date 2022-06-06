import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { GetUserProfileUseCase } from '@modules/accounts/useCases/profile/getUserProfile/GetUserProfileUseCase';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { createFakeProfile, createFakeUser } from '@utils/testUtils';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { SendActivateAccountMailUseCase } from '@modules/accounts/useCases/mail/sendActivateAccountMail/SendActivateAccountMailUseCase';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { UsersTokensRepository } from '@modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

let usersRepository: IUsersRepository;
let profilesRepository: ProfilesRepository;
let createUserUseCase: CreateUserUseCase;
let getUserProfileUseCase: GetUserProfileUseCase;
let usersTokensRepository: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;
let sendActivateAccountMailUseCase: SendActivateAccountMailUseCase;

describe('Get user profile', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    usersTokensRepository = new UsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    profilesRepository = new ProfilesRepository();
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
    getUserProfileUseCase = new GetUserProfileUseCase(profilesRepository);
  });

  it('should able to return user profile', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const gettedProfile = await getUserProfileUseCase.execute(
      organization.id.toString(),
      createdUser.id.toString(),
      true,
      true,
    );

    expect(gettedProfile).toBeDefined();
    expect(gettedProfile).toHaveProperty('id');
    expect(gettedProfile.user.id).toEqual(createdUser.id);
  });

  it('should not able to return non existent user profile', async () => {
    const user = await createFakeUser();

    const createdUser = await createUserUseCase.execute(user);

    const organization = await client.organization.create({
      data: {
        name: faker.company.companyName(),
        owner_id: createdUser.id,
      },
    });

    await expect(
      getUserProfileUseCase.execute(
        organization.id.toString(),
        '2',
        true,
        true,
      ),
    ).rejects.toEqual(
      new AppError('Profile not found', 404, 'profile.not_found'),
    );
  });
});
