import { EditGroupUseCase } from '@modules/groups/useCases/editGroup/EditGroupUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';

let editGroupUseCase: EditGroupUseCase;
let groupsRepository: IGroupsRepository;

describe('Edit Group', () => {
  beforeEach(() => {
    groupsRepository = new GroupsRepository();

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
});
