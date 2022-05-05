import { DeleteObjectiveUseCase } from '@modules/objectives/useCases/deleteObjective/DeleteObjectiveUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';
import { ObjectivesRepository } from '@modules/objectives/infra/prisma/repositories/ObjectivesRepository';

let deleteObjectiveUseCase: DeleteObjectiveUseCase;
let objectivesRepository: IObjectivesRepository;

describe('Delete Objective', () => {
  beforeEach(() => {
    objectivesRepository = new ObjectivesRepository();

    deleteObjectiveUseCase = new DeleteObjectiveUseCase(objectivesRepository);
  });

  it('should be able to delete objectives', async () => {
    const { organization } = await createFakeProfile();
    const group = await createFakeGroup(organization.id);

    await objectivesRepository.create(
      group.id,
      'Novo Objetivo',
      100,
      new Date(),
    );

    const spyOnObjectivesRepositoryDelete = jest.spyOn(
      objectivesRepository,
      'delete',
    );

    await deleteObjectiveUseCase.execute(group.id);

    expect(spyOnObjectivesRepositoryDelete).toHaveBeenCalledWith(group.id);
  });
});
