import { GetOrganizationInfoUseCase } from '@modules/organizations/useCases/getOrganizationInfo/GetOrganizationInfoUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

let getOrganizationInfoUseCase: GetOrganizationInfoUseCase;
let organizationsRepository: IOrganizationsRepository;

describe('Get organization info', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();

    getOrganizationInfoUseCase = new GetOrganizationInfoUseCase(
      organizationsRepository,
    );
  });

  it('should be able to get organization info', async () => {
    const { organization } = await createFakeProfile();

    const organizationInfo = await getOrganizationInfoUseCase.execute(
      organization.id,
    );

    expect(organizationInfo.name).toEqual(organization.name);
    expect(organizationInfo.id).toEqual(organization.id);
  });

  it('should not be able to get organization info with invalid id', async () => {
    await expect(getOrganizationInfoUseCase.execute(9418)).rejects.toEqual(
      new AppError('Organization not found', 404, 'organization.not_found'),
    );
  });
});
