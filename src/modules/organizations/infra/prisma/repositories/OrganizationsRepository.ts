import { Organization, Prisma, Profile } from '@prisma/client';
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

  async removeUser(organization_id: number, user_id: number): Promise<void> {
    const profile = await client.profile.findFirst({
      where: { user_id, organization_id },
    });

    await client.profile.delete({
      where: { id: profile.id },
    });
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

  async getRanking(
    organization_id: number,
    { page = 0, start_date, end_date },
  ): Promise<Profile[]> {
    const users = await client.profile.findMany({
      where: {
        organization_id,
        OR: [
          {
            received_feedbacks: {
              every: {
                created_at: {
                  gte: start_date,
                  lte: end_date,
                },
              },
            },
          },
          {
            sended_feedbacks: {
              every: {
                created_at: {
                  gte: start_date,
                  lte: end_date,
                },
              },
            },
          },
        ],
      },
      select: {
        user_id: true,
        sended_feedbacks: {
          where: {
            created_at: {
              gte: start_date,
              lte: end_date,
            },
          },
          select: {
            id: true,
          },
        },
        received_feedbacks: {
          where: {
            created_at: {
              gte: start_date,
              lte: end_date,
            },
          },
          select: {
            id: true,
          },
        },
      },
    });

    const userPoints = {};

    users.forEach(user => {
      userPoints[user.user_id] =
        user.received_feedbacks.length * 10 + user.sended_feedbacks.length * 5;
    });

    const sortedUsers = Object.keys(userPoints).sort(
      (a, b) => userPoints[b] - userPoints[a],
    );

    const ranking = await client.profile.findMany({
      where: {
        organization_id,
        user_id: {
          in: sortedUsers.slice(page * 10, page * 10 + 10).map(Number),
        },
      },
    });

    ranking.map(user => {
      user.points = userPoints[user.user_id];
      return user;
    });

    return ranking;
  }
}

export { OrganizationsRepository };
