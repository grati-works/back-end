import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';

@injectable()
class CreateGroupUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  async execute(
    authorId: string,
    organizationId: string,
    groupName: string,
    color?: string,
  ): Promise<void> {
    const author = await this.usersRepository.findById(Number(authorId));
    const group = await this.groupsRepository.create(
      Number(organizationId),
      groupName,
      color,
    );
    await this.groupsRepository.addUser(group.id, author.email);
  }
}

export { CreateGroupUseCase };
