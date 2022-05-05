import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CreateGroupUseCase } from '@modules/groups/useCases/createGroup/CreateGroupUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';
import faker from '@faker-js/faker';

let createGroupUseCase: CreateGroupUseCase;
let usersRepository: IUsersRepository;
let groupsRepository: IGroupsRepository;

describe('Create Group', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    groupsRepository = new GroupsRepository();

    createGroupUseCase = new CreateGroupUseCase(
      usersRepository,
      groupsRepository,
    );
  });

  it('should be able to create and add user to group', async () => {
    const { createdUser, organization } = await createFakeProfile();

    const spyCreateGroup = jest.spyOn(groupsRepository, 'create');
    const spyAddUser = jest.spyOn(groupsRepository, 'addUser');

    await createGroupUseCase.execute(
      createdUser.id.toString(),
      organization.id.toString(),
      faker.lorem.words(2),
      faker.internet.color(),
    );

    expect(spyCreateGroup).toHaveBeenCalledTimes(1);
    expect(spyAddUser).toHaveBeenCalledTimes(1);
  });
});
