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
    author_id: string,
    organization_id: string,
    groupName: string,
    color?: string,
  ): Promise<void> {
    const author = await this.usersRepository.findById(Number(author_id));
    const group = await this.groupsRepository.create(
      Number(organization_id),
      groupName,
      color,
    );
    await this.groupsRepository.addUser(
      Number(organization_id),
      group.id,
      author.email,
    );
  }
}

export { CreateGroupUseCase };
