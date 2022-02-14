import { Organization, Prisma } from '@prisma/client'
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';

interface IOrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  addUser(organization_id: number, user: IAddUserDTO): Promise<Organization>;
}

export { IOrganizationsRepository };