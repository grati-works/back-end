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

  test.todo('should be able to edit objectives');
});
