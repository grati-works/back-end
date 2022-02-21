import { Organization, Prisma } from '@prisma/client';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { client } from '@shared/infra/prisma';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';

class OrganizationsRepository implements IOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await client.organization.create({
      data,
    });

    return organization;
  }

  async update(
    organization_id: number,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<void> {
    await client.organization.update({
      where: { id: organization_id },
      data,
    });
  }

  async addUser(
    organization_id: number,
    user: IAddUserDTO,
  ): Promise<Organization> {
    const profile = await client.profile.findUnique({
      where: { email: user.email },
    });

    const addedUser = await client.organization.update({
      where: { id: organization_id },
      data: {
        users: {
          connect: {
            id: profile.id,
          },
        },
      },
    });

    return addedUser;
  }

  findById(id: number): Promise<Organization> {
    return client.organization.findUnique({
      where: { id },
    });
  }

  async checkIfUserIsOwner(
    user_id: number,
    organization_id: number,
  ): Promise<boolean> {
    console.log(user_id, organization_id);
    const organization = await client.profile.findUnique({
      where: { id: user_id },
      include: {
        owned_organizations: true,
      },
    });

    return organization.owned_organizations.some(
      organization => organization.id === organization_id,
    );
  }
}

export { OrganizationsRepository };
