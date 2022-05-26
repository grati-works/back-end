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
    getAllData: boolean,
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
          sended_feedbacks:
            getAllData === true
              ? {
                  where: {
                    deleted: null,
                  },
                  include: {
                    reactions: true,
                    receivers: {
                      include: {
                        user: true,
                      },
                    },
                    sender: {
                      include: {
                        user: true,
                      },
                    },
                  },
                }
              : false,
          received_feedbacks:
            getAllData === true
              ? {
                  where: {
                    deleted: null,
                  },
                  include: {
                    reactions: true,
                    receivers: {
                      include: {
                        user: true,
                      },
                    },
                    sender: {
                      include: {
                        user: true,
                      },
                    },
                  },
                }
              : false,

          skills: true,
          graduations: true,
          vinculed_accounts: true,
          description: true,
        },
      );

    if (!profile) {
      throw new AppError('Profile not found', 404, 'profile.not_found');
    }

    return profile;
  }
}

export { GetUserProfileUseCase };
