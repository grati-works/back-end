import { inject, injectable } from 'tsyringe';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { Prisma, Profile } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';

@injectable()
class UpdateProfileUseCase {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  async execute(
    id: string,
    data: Prisma.ProfileUpdateInput,
  ): Promise<Prisma.Prisma__ProfileClient<any>> {
    const profile = await this.profilesRepository.findById(Number(id));

    if (!profile) {
      throw new AppError('Profile not found', 404, 'profile.not_found');
    }

    if (data.vinculed_accounts !== undefined) {
      await client.vinculedAccount.deleteMany({
        where: {
          user_id: Number(id),
        },
      });
    }

    const updatedProfile = await this.profilesRepository.update(
      Number(id),
      data,
    );

    return updatedProfile;
  }
}

export { UpdateProfileUseCase };
