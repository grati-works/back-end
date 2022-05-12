import { EditGroupUseCase } from '@modules/groups/useCases/editGroup/EditGroupUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

let editGroupUseCase: EditGroupUseCase;
let groupsRepository: IGroupsRepository;
let dateProvider: IDateProvider;

describe('Edit Group', () => {
  beforeEach(() => {
    groupsRepository = new GroupsRepository();
    dateProvider = new DayjsDateProvider();

    editGroupUseCase = new EditGroupUseCase(groupsRepository);
  });

  it('should be able to edit group', async () => {
    const { organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);
    const newGroupName = 'Novo nome';

    await editGroupUseCase.execute(group.id.toString(), { name: newGroupName });

    const updatedGroup = await groupsRepository.findByNameAndOrganizationId(
      newGroupName,
      organization.id,
    );

    expect(updatedGroup.name).toBe(newGroupName);
  });

  it('should be able to push permissions to newData', async () => {
    const { organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);
    const newPermissions = [1, 2, 3];

    await editGroupUseCase.execute(group.id.toString(), {
      permissions: newPermissions,
    });

    const updatedGroup = await groupsRepository.findByNameAndOrganizationId(
      group.name,
      organization.id,
    );

    const updatedGroupPermissions = updatedGroup.permissions.map(
      permission => permission.id,
    );

    expect(updatedGroupPermissions).toEqual(newPermissions);
  });

  it('should be able to push objectives to newData', async () => {
    const { organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);
    const objective = {
      name: 'objective',
      goal: 100,
      expires_in: dateProvider.addDays(5),
    };

    await editGroupUseCase.execute(group.id.toString(), {
      objective,
    });

    const updatedGroup = await groupsRepository.findByNameAndOrganizationId(
      group.name,
      organization.id,
    );

    expect(updatedGroup.objective.name).toEqual(objective.name);
    expect(updatedGroup.objective.goal).toEqual(objective.goal);
    expect(updatedGroup.objective.expires_in).toEqual(objective.expires_in);
  });
});
