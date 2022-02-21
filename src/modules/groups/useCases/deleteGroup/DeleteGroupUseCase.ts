import { inject, injectable } from 'tsyringe';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';

@injectable()
class DeleteGroupUseCase {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
  ) {}

  async execute(groupId: string): Promise<void> {
    await this.groupsRepository.delete(Number(groupId));
  }
}

export { DeleteGroupUseCase };
