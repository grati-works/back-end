import { GetAllObjectivesUseCase } from '@modules/objectives/useCases/getAllObjectives/GetAllObjectivesUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';
import { ObjectivesRepository } from '@modules/objectives/infra/prisma/repositories/ObjectivesRepository';
import { AppError } from '@shared/errors/AppError';
import { EditObjectiveUseCase } from '@modules/objectives/useCases/editObjective/EditObjectiveUseCase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AddUserUseCase } from '@modules/groups/useCases/addUser/AddUserUseCase';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';
import { UsersRepository } from '@modules/accounts/infra/prisma/repositories/UsersRepository';
import { GroupsRepository } from '@modules/groups/infra/prisma/repositories/GroupsRepository';

let getAllObjectivesUseCase: GetAllObjectivesUseCase;
let editObjectiveUseCase: EditObjectiveUseCase;
let objectivesRepository: IObjectivesRepository;
let dateProvider: IDateProvider;
let addUserUseCase: AddUserUseCase;
let usersRepository: IUsersRepository;
let groupsRepository: IGroupsRepository;

describe('Get all Objectives', () => {
  beforeEach(() => {
    objectivesRepository = new ObjectivesRepository();
    dateProvider = new DayjsDateProvider();
    usersRepository = new UsersRepository();
    groupsRepository = new GroupsRepository();

    getAllObjectivesUseCase = new GetAllObjectivesUseCase(objectivesRepository);
    editObjectiveUseCase = new EditObjectiveUseCase(objectivesRepository);
    addUserUseCase = new AddUserUseCase(usersRepository, groupsRepository);
  });

  it('should not be able to get all objectives if not have objectives', async () => {
    const { organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);

    await expect(getAllObjectivesUseCase.execute(group.id)).rejects.toEqual(
      new AppError('Objectives not found', 404, 'objectives.not_found'),
    );
  });

  it('should be able to get all objectives', async () => {
    const { createdUser, createdProfile, organization } =
      await createFakeProfile();
    const group = await createFakeGroup(organization.id);
    await addUserUseCase.execute(organization.id, group.id, createdUser.email);

    const objective = {
      name: 'objective',
      goal: 100,
      expires_in: dateProvider.addDays(5),
      group_id: group.id,
    };

    await editObjectiveUseCase.execute(
      objective.group_id,
      objective.name,
      objective.goal,
      objective.expires_in,
    );

    const objectives = await getAllObjectivesUseCase.execute(createdProfile.id);

    expect(objectives).toHaveLength(1);
  });
});
