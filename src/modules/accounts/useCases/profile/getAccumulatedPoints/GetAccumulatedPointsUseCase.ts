import { inject, injectable } from 'tsyringe';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { Prisma } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

@injectable()
class GetAccumulatedPointsUseCase {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
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
        },
      );

    if (!profile) {
      throw new AppError('Profile not found', 404, 'profile.not_found');
    }

    const points = await this.profilesRepository.getAccumulatedPoints(
      profile.id,
      this.dateProvider.removeMonths(1),
      this.dateProvider.dateNow(),
    );

    return points;
  }
}

export { GetAccumulatedPointsUseCase };
