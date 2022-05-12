import { inject, injectable } from 'tsyringe';

import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { Prisma } from '@prisma/client';

@injectable()
class EditGroupUseCase {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  async execute(
    group_id: string,
    data: {
      name?: string;
      color?: string;
      permissions?: number[];
      objective?: Prisma.ObjectiveCreateWithoutGroupInput;
    },
  ): Promise<void> {
    let newData = data as any;

    if (data.permissions) {
      newData = {
        ...newData,
        permissions: {
          connect: [
            ...data.permissions.map(permission => ({
              id: permission,
            })),
          ],
        },
      };
    }

    if (data.objective) {
      newData = {
        ...newData,
        objective: {
          upsert: {
            create: data.objective,
            update: data.objective,
          },
        },
      };
    }

    await this.groupsRepository.edit(Number(group_id), newData);
  }
}

export { EditGroupUseCase };
