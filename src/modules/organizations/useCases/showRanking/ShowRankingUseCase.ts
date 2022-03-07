import { inject, injectable } from 'tsyringe';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';

@injectable()
class ShowRankingUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute(organization_id: string): Promise<void> {
    await this.organizationsRepository.getRanking(Number(organization_id));
  }
}

export { ShowRankingUseCase };
