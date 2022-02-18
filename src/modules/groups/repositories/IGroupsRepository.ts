import { Group } from '@prisma/client';

interface IGroupsRepository {
  create(organization_id: number, name: string, color?: string): Promise<Group>;
  addUser(group_id: number, email: string): Promise<Group>;
}

export { IGroupsRepository };
