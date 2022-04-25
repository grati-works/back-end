import { Prisma, Profile } from '@prisma/client';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { client } from '@shared/infra/prisma';
import axios from 'axios';

class ProfilesRepository implements IProfilesRepository {
  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    const profile = await client.profile.create({
      data,
      include: {
        user: true,
      },
    });

    try {
      await axios.post(
        `${process.env.SEARCH_SERVICE_URL}/user/${data.organization.connect.id}/${profile.id}`,
        {
          name: profile.user.name,
          username: profile.user.username,
          responsibility: '',
          about: '',
          skills: '',
          graduations: '',
        },
      );
    } catch {
      console.log(
        `Não foi possível inserir os dados do usuário ${profile.user.username} no Search Service.`,
      );
    }

    return profile;
  }

  async update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    const profile = await client.profile.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });

    const { organization_id } = await client.profile.findUnique({
      where: { id },
      select: {
        organization_id: true,
      },
    });

    try {
      await axios.post(
        `${process.env.SEARCH_SERVICE_URL}/user/${organization_id}/${profile.id}`,
        {
          name: profile.user.name,
          username: profile.user.username,
          responsibility: profile.responsibility,
          about: profile.description.replace(/(<([^>]+)>)/gi, ''),
          skills: profile.skills.replace(/(<([^>]+)>)/gi, ''),
          graduations: profile.graduations.replace(/(<([^>]+)>)/gi, ''),
        },
      );
    } catch {
      console.log(
        `Não foi possível atualizar os dados do usuário ${profile.user.username} no Search Service.`,
      );
    }

    return profile;
  }

  async findById(
    id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Prisma.Prisma__ProfileClient<object>> {
    const profile = await client.profile.findUnique({
      where: { id },
      select,
    });

    return profile;
  }

  async findProfileByUserAndOrganizationId(
    organization_id: number,
    user_id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Prisma.Prisma__ProfileClient<object>> {
    const profile = await client.profile.findFirst({
      where: {
        user_id,
        organization_id,
      },
      select,
    });

    return profile;
  }

  async addPoints(id: number, points: number): Promise<void> {
    await client.profile.update({
      where: {
        id,
      },
      data: {
        points: {
          increment: points,
        },
      },
    });
  }

  async getAccumulatedPoints(
    profile_id: number,
    start_date: Date,
    end_date: Date,
  ): Promise<number> {
    const user = await client.profile.findFirst({
      where: {
        id: profile_id,
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

    return (
      user.received_feedbacks.length * 10 + user.sended_feedbacks.length * 5
    );
  }

  async findProfileByUsernameAndOrganizationId(
    username: string,
    organization_id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Prisma.Prisma__ProfileClient<object>> {
    const profile = await client.profile.findFirst({
      where: {
        user: {
          username,
        },
        organization_id,
      },
      select,
    });

    return profile;
  }

  async findManyByUserAndOrganizationId(
    user_ids: number[],
    organization_id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<object[]> {
    const profiles = await client.profile.findMany({
      where: {
        id: {
          in: user_ids,
        },
        organization_id,
      },
      select,
    });

    return profiles;
  }
}

export { ProfilesRepository };
