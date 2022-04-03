import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateUserUseCase } from '@modules/accounts/useCases/user/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';
import { faker } from '@faker-js/faker';
import { client } from '@shared/infra/prisma';
import { UpdateProfileUseCase } from '@modules/accounts/useCases/profile/updateProfile/UpdateProfileUseCase';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { createFakeProfile, createFakeUser } from '@utils/testUtils';
import { GetUserProfileUseCase } from '@modules/accounts/useCases/profile/getUserProfile/GetUserProfileUseCase';

let usersRepository: IUsersRepository;
let profilesRepository: ProfilesRepository;
let updateProfileUseCase: UpdateProfileUseCase;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Update user profile', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    profilesRepository = new ProfilesRepository();

    updateProfileUseCase = new UpdateProfileUseCase(profilesRepository);
    getUserProfileUseCase = new GetUserProfileUseCase(profilesRepository);
  });

  afterAll(async () => {
    await client.userTokens.deleteMany();
    await client.profile.deleteMany();
    await client.organization.deleteMany();
    await client.user.deleteMany();
  });

  it('should not be able to update user profile if user not exists', async () => {
    await expect(
      updateProfileUseCase.execute('123', { points: 10 }),
    ).rejects.toEqual(
      new AppError('Profile not found', 404, 'profile.not_found'),
    );
  });

  it('should be able to update profile', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const gettedProfile = await getUserProfileUseCase.execute(
      organization.id.toString(),
      createdUser.id.toString(),
      true,
    );

    await updateProfileUseCase.execute(gettedProfile.id, { points: 10 });

    const updatedProfile = await getUserProfileUseCase.execute(
      organization.id.toString(),
      createdUser.id.toString(),
      true,
    );

    expect(updatedProfile.points).toEqual(10);
  });
});
