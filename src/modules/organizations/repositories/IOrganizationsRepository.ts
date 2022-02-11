import { Organization, Prisma } from '@prisma/client'

interface IOrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}

export { IOrganizationsRepository };