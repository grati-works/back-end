import { Group, Prisma } from '@prisma/client';

interface IGroupsRepository {
  create(organization_id: number, name: string, color?: string): Promise<Group>;
  edit(group_id: number, data: Prisma.GroupUpdateInput): Promise<void>;
  addUser(
    organization_id: number,
    group_id: number,
    email: string,
  ): Promise<Group>;
  delete(group_id: number): Promise<void>;
  findByNameAndOrganizationId(
    name: string,
    organization_id: number,
  ): Promise<Group>;
}

export { IGroupsRepository };
