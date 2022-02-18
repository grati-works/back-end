import { Group } from '@prisma/client';
import { client } from '@shared/infra/prisma';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { AppError } from '@shared/errors/AppError';

class GroupsRepository implements IGroupsRepository {
  async create(
    organization_id: number,
    name: string,
    color?: string,
  ): Promise<Group> {
    const alreadyExistGroupNameInOrganization = await client.group.findFirst({
      where: {
        name,
        organization: {
          id: organization_id,
        },
      },
    });

    if (alreadyExistGroupNameInOrganization) {
      throw new AppError('Group name already exist in this organization');
    }

    if (!color) color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    const createdGroup = await client.group.create({
      data: {
        organization: {
          connect: {
            id: organization_id,
          },
        },
        name,
        color,
      },
    });

    return createdGroup;
  }

  async addUser(group_id: number, email: string): Promise<Group> {
    const profile = await client.profile.findUnique({
      where: { email },
    });

    const updatedGroup = await client.group.update({
      where: { id: group_id },
      data: {
        users: {
          connect: {
            id: profile.id,
          },
        },
      },
    });

    return updatedGroup;
  }
}

export { GroupsRepository };
