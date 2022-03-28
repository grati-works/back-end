import { client } from '@shared/infra/prisma';

import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';

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
    id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void> {
    await client.objective.update({
      where: {
        id,
      },
      data: {
        name,
        goal,
        expires_in,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await client.objective.delete({
      where: {
        id,
      },
    });
  }
}

export { ObjectivesRepository };
