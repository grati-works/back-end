import { GetAllObjectivesUseCase } from '@modules/objectives/useCases/getAllObjectives/GetAllObjectivesUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';
import { ObjectivesRepository } from '@modules/objectives/infra/prisma/repositories/ObjectivesRepository';

let getAllObjectivesUseCase: GetAllObjectivesUseCase;
let objectivesRepository: IObjectivesRepository;

describe('Get all Objectives', () => {
  beforeEach(() => {
    objectivesRepository = new ObjectivesRepository();

    getAllObjectivesUseCase = new GetAllObjectivesUseCase(objectivesRepository);
  });

  test.todo('should be able to get all objectives');
});
