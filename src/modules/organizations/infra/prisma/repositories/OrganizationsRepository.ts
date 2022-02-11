import { Organization, Prisma } from '@prisma/client'
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { client } from '@shared/infra/prisma';
import { ICreateOrganizationDTO } from '@modules/organizations/dtos/ICreateOrganizationDTO';

class OrganizationsRepository implements IOrganizationsRepository {
    async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
        const organization = await client.organization.create({
            data
        });

        return organization;
    }
}

export { OrganizationsRepository };