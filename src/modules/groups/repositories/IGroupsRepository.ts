import { Group, Prisma } from '@prisma/client';

interface IGroupsRepository {
  create(organization_id: number, name: string, color?: string): Promise<Group>;
  edit(group_id: number, data: Prisma.GroupUpdateInput): Promise<void>;
  addUser(group_id: number, email: string): Promise<Group>;
}

export { IGroupsRepository };
