import { Objective } from '@prisma/client';

interface IObjectivesRepository {
  create(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void>;
  edit(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void>;
  delete(group_id: number): Promise<void>;
  getAllObjectives(group_id: number): Promise<Objective>;
}
export { IObjectivesRepository };
