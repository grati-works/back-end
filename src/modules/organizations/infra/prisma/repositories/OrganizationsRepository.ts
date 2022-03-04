import { Organization, Prisma } from '@prisma/client';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { client } from '@shared/infra/prisma';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';
import { AppError } from '@shared/errors/AppError';

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
    { email }: IAddUserDTO,
  ): Promise<Organization> {
    const user = await client.user.findUnique({
      where: { email },
    });

    if (user) {
      const addedUser = await client.organization.update({
        where: { id: organization_id },
        data: {
          users: {
            create: {
              user_id: user.id,
            },
          },
        },
      });

      return addedUser;
    }
    throw new AppError('User not found');
  }

  async removeUser(
    organization_id: number,
    user_id: number,
  ): Promise<Organization> {
    const user = await client.profile.findFirst({
      where: {
        organization_id,
        user_id,
      },
    });

    const removedUser = await client.organization.update({
      where: { id: organization_id },
      data: {
        users: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });

    return removedUser;
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
    const organization = await client.user.findUnique({
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
