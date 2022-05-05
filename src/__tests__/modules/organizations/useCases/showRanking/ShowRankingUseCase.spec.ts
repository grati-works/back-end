import { ShowRankingUseCase } from '@modules/organizations/useCases/showRanking/ShowRankingUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';

let showRankingUseCase: ShowRankingUseCase;
let organizationsRepository: IOrganizationsRepository;

describe('Show organization ranking', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();

    showRankingUseCase = new ShowRankingUseCase(organizationsRepository);
  });

  test.todo('should be able to remove user from organization');
});
