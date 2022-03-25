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
  ): Promise<Prisma.Prisma__ProfileClient<any>> {
    const profile =
      await this.profilesRepository.findProfileByUserAndOrganizationId(
        Number(organization_id),
        Number(id),
        {
          id: true,
          user_id: true,
          responsibility: true,
          description: true,
          organization_id: true,
          points: true,
          vinculed_accounts: true,
          skills: true,
          graduations: true,
        },
      );

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    return profile;
  }
}

export { GetUserProfileUseCase };
