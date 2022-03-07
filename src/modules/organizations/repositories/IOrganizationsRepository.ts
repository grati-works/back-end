import { Organization, Prisma, Profile } from '@prisma/client';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';

interface IOrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  update(
    organization_id: number,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<void>;
  addUser(
    organization_id: number,
    { email }: IAddUserDTO,
  ): Promise<Organization>;
  removeUser(organization_id: number, user_id: number): Promise<void>;
  findById(id: number): Promise<Organization>;
  checkIfUserIsOwner(
    user_id: number,
    organization_id: number,
  ): Promise<boolean>;
  getRanking(organization_id: number, page?: number): Promise<Profile[]>;
}

export { IOrganizationsRepository };
