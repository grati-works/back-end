import { inject, injectable } from 'tsyringe';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';
import { Objective } from '@prisma/client';

@injectable()
class GetAllObjectivesUseCase {
  constructor(
    @inject('ObjectivesRepository')
    private objectivesRepository: IObjectivesRepository,
  ) {}

  async execute(group_id: number): Promise<Objective> {
    const objectives = await this.objectivesRepository.getAllObjectives(
      group_id,
    );
    return objectives;
  }
}

export { GetAllObjectivesUseCase };
