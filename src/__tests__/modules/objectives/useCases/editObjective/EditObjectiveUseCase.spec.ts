import { EditObjectiveUseCase } from '@modules/objectives/useCases/editObjective/EditObjectiveUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';
import { ObjectivesRepository } from '@modules/objectives/infra/prisma/repositories/ObjectivesRepository';

let editObjectiveUseCase: EditObjectiveUseCase;
let objectivesRepository: IObjectivesRepository;

describe('Edit Objective', () => {
  beforeEach(() => {
    objectivesRepository = new ObjectivesRepository();

    editObjectiveUseCase = new EditObjectiveUseCase(objectivesRepository);
  });

  it('should be able to edit objectives', async () => {
    const { organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);

    const spyObjectiveEdit = jest.spyOn(objectivesRepository, 'edit');
    const objectiveDate = new Date();
    await editObjectiveUseCase.execute(
      group.id,
      'New Objective',
      100,
      objectiveDate,
    );

    expect(spyObjectiveEdit).toHaveBeenCalledWith(
      group.id,
      'New Objective',
      100,
      objectiveDate,
    );
  });
});
