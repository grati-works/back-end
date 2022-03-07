import { inject, injectable } from 'tsyringe';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { Profile } from '@prisma/client';

@injectable()
class ShowRankingUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute(organization_id: string): Promise<Profile[]> {
    const ranking = await this.organizationsRepository.getRanking(
      Number(organization_id),
    );
    return ranking;
  }
}

export { ShowRankingUseCase };
