// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Organization, Prisma, Profile } from '@prisma/client';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { client } from '@shared/infra/prisma';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';
import { AppError } from '@shared/errors/AppError';
import axios from 'axios';
import { logger } from '@utils/logger';

class OrganizationsRepository implements IOrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await client.organization.create({
      data,
    });

    await client.group.create({
      data: {
        name: 'Público',
        organization_id: organization.id,
      },
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

      const profile = await client.profile.findFirst({
        where: {
          user_id: user.id,
          organization_id,
        },
        select: {
          id: true,
          user: true,
        },
      });

      try {
        await axios.post(
          `${process.env.SEARCH_SERVICE_URL}/user/${organization_id}/${profile.id}`,
          {
            name: user.name,
            username: user.username,
            responsibility: '',
            about: '',
            skills: '',
            graduations: '',
          },
        );
      } catch (error) {
        logger.info(
          `Não foi possível inserir os dados do usuário ${profile.user.username} no Search Service.`,
        );
      }

      return addedUser;
    }
    throw new AppError('User not found', 404, 'user.not_found');
  }

  async removeUser(organization_id: number, user_id: number): Promise<void> {
    const profile = await client.profile.findFirst({
      where: { user_id, organization_id },
    });

    await client.profile.delete({
      where: { id: profile.id },
    });
  }

  async findById(id: number): Promise<Organization> {
    const organization = await client.organization.findUnique({
      where: { id },
      include: {
        color_mode: true,
        groups: {
          include: {
            objective: true,
          },
        },
        users: {
          include: {
            user: true,
            groups: true,
          },
        },
      },
    });

    return organization;
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
    getUser = false,
  ): Promise<{
    sended_feedbacks: number;
    received_feedbacks: number;
    ranking: Profile[];
    total_pages: number;
  }> {
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

    const sended_feedbacks = users.reduce(
      (acc, user) => acc + user.sended_feedbacks.length,
      0,
    );

    const received_feedbacks = users.reduce(
      (acc, user) => acc + user.received_feedbacks.length,
      0,
    );

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
      include: {
        user: {
          select: {
            id: true,
            name: getUser,
            profile_picture: getUser,
            username: getUser,
          },
        },
      },
    });

    ranking.map(user => {
      const points = userPoints[user.user.id];
      user.points = points;
      user.level = this.getLevel(points);
      user.received_feedbacks = users.find(
        profile => user.user.id === profile.user_id,
      ).received_feedbacks.length;
      return user;
    });

    return {
      sended_feedbacks,
      received_feedbacks,
      ranking: ranking.sort((a, b) => b.points - a.points),
      total_pages: Math.ceil(sortedUsers.length / 10),
    };
  }

  async getUsers(organization_id: number): Promise<Profile[]> {
    const users = await client.profile.findMany({
      where: { organization_id },
      select: {
        id: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_picture: true,
            username: true,
            email: true,
            organizations: {
              where: { organization_id },
              select: {
                groups: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return users;
  }

  getLevel(points: number): number {
    if (points >= 0 && points < 100) {
      return 1;
    }
    if (points >= 100 && points < 200) {
      return 2;
    }
    if (points >= 200 && points < 300) {
      return 3;
    }
    if (points >= 300 && points < 400) {
      return 4;
    }
    if (points >= 400 && points < 500) {
      return 5;
    }
    if (points >= 500 && points < 600) {
      return 6;
    }
    if (points >= 600 && points < 700) {
      return 7;
    }
    if (points >= 700 && points < 800) {
      return 8;
    }
    if (points >= 800 && points < 900) {
      return 9;
    }
    if (points >= 900 && points < 1000) {
      return 10;
    }
    return 1;
  }
}

export { OrganizationsRepository };
