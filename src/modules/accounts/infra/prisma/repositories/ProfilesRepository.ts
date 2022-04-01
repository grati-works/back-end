import { Prisma, Profile } from '@prisma/client';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import { client } from '@shared/infra/prisma';

class ProfilesRepository implements IProfilesRepository {
  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    const profile = await client.profile.create({
      data,
    });

    return profile;
  }

  async update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    const profile = await client.profile.update({
      where: { id },
      data,
    });

    return profile;
  }

  async findById(
    id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Prisma.Prisma__ProfileClient<any>> {
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
  ): Promise<Prisma.Prisma__ProfileClient<any>> {
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
}

export { ProfilesRepository };
