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
    isPublic: boolean,
  ): Promise<Prisma.Prisma__ProfileClient<any>> {
    const profile =
      await this.profilesRepository.findProfileByUserAndOrganizationId(
        Number(organization_id),
        Number(id),
        {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              username: !isPublic,
              email: !isPublic,
              profile_picture: true,
            },
          },
          responsibility: true,
          points: true,
          sended_feedbacks: true,
          received_feedbacks: true,

          skills: isPublic,
          graduations: isPublic,
          vinculed_accounts: isPublic,
          description: isPublic,
        },
      );

    if (!profile) {
      throw new AppError('Profile not found', 404, 'profile.not_found');
    }

    return profile;
  }
}

export { GetUserProfileUseCase };
