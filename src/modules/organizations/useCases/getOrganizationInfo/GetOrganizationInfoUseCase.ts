import { inject, injectable } from 'tsyringe';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { Organization } from '@prisma/client';

@injectable()
class GetOrganizationInfoUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute(organization_id: number): Promise<Organization> {
    const organization = await this.organizationsRepository.findById(
      organization_id,
    );

    if (!organization) {
      throw new Error('Organization not found');
    }

    return organization;
  }
}

export { GetOrganizationInfoUseCase };
