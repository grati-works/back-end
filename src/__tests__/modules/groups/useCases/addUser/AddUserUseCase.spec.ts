import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AddUserUseCase } from '@modules/groups/useCases/addUser/AddUserUseCase';
import { createFakeProfile, createFakeGroup } from '@utils/testUtils';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';

let addUserUseCase: AddUserUseCase;
let usersRepository: IUsersRepository;
let groupsRepository: IGroupsRepository;

describe('Add User to Group', () => {
  beforeEach(() => {
    usersRepository = new UsersRepository();
    groupsRepository = new GroupsRepository();

    addUserUseCase = new AddUserUseCase(usersRepository, groupsRepository);
  });

  it('should be able to add user to group', async () => {
    const { createdUser, organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);

    const spyAddUser = jest.spyOn(groupsRepository, 'addUser');

    await addUserUseCase.execute(organization.id, group.id, createdUser.email);

    expect(spyAddUser).toHaveBeenCalledWith(
      organization.id,
      group.id,
      createdUser.email,
    );
  });
});
