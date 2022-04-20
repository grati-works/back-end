import { Objective } from '@prisma/client';

interface IObjectivesRepository {
  create(
    group_id: number,
    name: string,
    goal: number,
    expires_in: Date,
  ): Promise<void>;
  edit(
    group_id: number,
    name: string,
    goal: number,
    expires_in: Date,
  ): Promise<void>;
  delete(group_id: number): Promise<void>;
  getAllObjectives(profile_id: number): Promise<Objective[]>;
}
export { IObjectivesRepository };
