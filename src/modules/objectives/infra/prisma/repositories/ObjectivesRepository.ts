import { client } from '@shared/infra/prisma';

import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';
import { Objective } from '@prisma/client';

class ObjectivesRepository implements IObjectivesRepository {
  async create(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void> {
    await client.objective.create({
      data: {
        group_id,
        name,
        goal,
        expires_in,
      },
    });
  }

  async edit(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void> {
    await client.objective.update({
      where: {
        group_id,
      },
      data: {
        name,
        goal,
        expires_in,
      },
    });
  }

  async delete(group_id: number): Promise<void> {
    await client.objective.delete({
      where: {
        group_id,
      },
    });
  }

  async getAllObjectives(profile_id: number): Promise<Objective[]> {
    const objectives = await client.objective.findMany({
      where: {
        group: {
          users: {
            some: {
              id: profile_id,
            },
          },
        },
      },
    });

    return objectives;
  }
}

export { ObjectivesRepository };
