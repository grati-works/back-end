import { inject, injectable } from 'tsyringe';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';
import { Objective } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';

@injectable()
class GetAllObjectivesUseCase {
  constructor(
    @inject('ObjectivesRepository')
    private objectivesRepository: IObjectivesRepository,
  ) {}

  async execute(group_id: number): Promise<Objective[]> {
    const objectives = await this.objectivesRepository.getAllObjectives(
      group_id,
    );

    if (!objectives || objectives.length === 0) {
      throw new AppError('Objectives not found', 404, 'objectives.not_found');
    }

    return objectives;
  }
}

export { GetAllObjectivesUseCase };
