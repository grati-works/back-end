import { DeleteGroupUseCase } from '@modules/groups/useCases/deleteGroup/DeleteGroupUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';

let deleteGroupUseCase: DeleteGroupUseCase;
let groupsRepository: IGroupsRepository;

describe('Delete Group', () => {
  beforeEach(() => {
    groupsRepository = new GroupsRepository();

    deleteGroupUseCase = new DeleteGroupUseCase(groupsRepository);
  });

  it('should be able to delete group', async () => {
    const { organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);

    const spyDeleteGroup = jest.spyOn(groupsRepository, 'delete');

    await deleteGroupUseCase.execute(group.id.toString());

    expect(spyDeleteGroup).toHaveBeenCalledWith(group.id);
  });
});
