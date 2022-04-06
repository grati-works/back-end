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
  ): Promise<{
    ranking: Profile[];
    total_pages: number;
  }> {
    const classification = await this.organizationsRepository.getRanking(
      Number(organization_id),
      {
        ...filter,
      },
      true,
    );
    return {
      ranking: classification.ranking,
      total_pages: classification.total_pages,
    };
  }
}

export { ShowRankingUseCase };
