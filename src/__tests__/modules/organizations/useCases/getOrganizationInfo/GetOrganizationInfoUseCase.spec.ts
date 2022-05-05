import { GetOrganizationInfoUseCase } from '@modules/organizations/useCases/getOrganizationInfo/GetOrganizationInfoUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';

let getOrganizationInfoUseCase: GetOrganizationInfoUseCase;
let organizationsRepository: IOrganizationsRepository;

describe('Get organization info', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();

    getOrganizationInfoUseCase = new GetOrganizationInfoUseCase(
      organizationsRepository,
    );
  });

  test.todo('should be able to get organization info');
});
