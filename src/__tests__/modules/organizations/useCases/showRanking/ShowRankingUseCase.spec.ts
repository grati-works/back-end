import { ShowRankingUseCase } from '@modules/organizations/useCases/showRanking/ShowRankingUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';

let showRankingUseCase: ShowRankingUseCase;
let organizationsRepository: IOrganizationsRepository;

describe('Show organization ranking', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();

    showRankingUseCase = new ShowRankingUseCase(organizationsRepository);
  });

  it('should be able to remove user from organization', async () => {
    const showRankingUseCaseSpy = jest.spyOn(showRankingUseCase, 'execute');

    const { organization } = await createFakeProfile();

    const { total_pages } = await showRankingUseCase.execute(
      organization.id.toString(),
      {
        page: 1,
        start_date: new Date('2020-01-01'),
        end_date: new Date(),
      },
    );

    expect(total_pages).toBe(1);
    expect(showRankingUseCaseSpy).toHaveBeenCalled();
  });
});
