import { AppError } from '@shared/errors/AppError';
import { UpdateProfileUseCase } from '@modules/accounts/useCases/profile/updateProfile/UpdateProfileUseCase';
import { ProfilesRepository } from '@modules/accounts/infra/prisma/repositories/ProfilesRepository';
import { createFakeProfile } from '@utils/testUtils';
import { GetUserProfileUseCase } from '@modules/accounts/useCases/profile/getUserProfile/GetUserProfileUseCase';

let profilesRepository: ProfilesRepository;
let updateProfileUseCase: UpdateProfileUseCase;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Update user profile', () => {
  beforeEach(() => {
    profilesRepository = new ProfilesRepository();

    updateProfileUseCase = new UpdateProfileUseCase(profilesRepository);
    getUserProfileUseCase = new GetUserProfileUseCase(profilesRepository);
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
