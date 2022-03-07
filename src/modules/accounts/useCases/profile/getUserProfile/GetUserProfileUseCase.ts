import { inject, injectable } from 'tsyringe';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { Prisma } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class GetUserProfileUseCase {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  async execute(
    organization_id: string,
    id: string,
  ): Promise<Prisma.Prisma__ProfileClient<object>> {
    const profile =
      await this.profilesRepository.findProfileByUserAndOrganizationId(
        Number(organization_id),
        Number(id),
      );

    if (!profile) {
      throw new AppError('Profile not found.');
    }

    return profile;
  }
}

export { GetUserProfileUseCase };
