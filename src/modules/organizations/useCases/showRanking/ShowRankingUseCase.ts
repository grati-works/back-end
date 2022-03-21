import { inject, injectable } from 'tsyringe';
import {
  IOrganizationsRepository,
  IRankingFilter,
} from '@modules/organizations/repositories/IOrganizationsRepository';
import { Profile } from '@prisma/client';

@injectable()
class ShowRankingUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute(
    organization_id: string,
    filter: IRankingFilter,
  ): Promise<Profile[]> {
    const classification = await this.organizationsRepository.getRanking(
      Number(organization_id),
      {
        ...filter,
      },
    );
    return classification.ranking;
  }
}

export { ShowRankingUseCase };
