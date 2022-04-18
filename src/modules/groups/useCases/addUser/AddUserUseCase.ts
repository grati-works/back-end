import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';

@injectable()
class AddUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  async execute(
    organization_id: number,
    group_id: number,
    email: string,
  ): Promise<void> {
    await this.groupsRepository.addUser(organization_id, group_id, email);
  }
}

export { AddUserUseCase };
