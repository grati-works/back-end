import { inject, injectable } from 'tsyringe';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';

@injectable()
class DeleteObjectiveUseCase {
  constructor(
    @inject('ObjectivesRepository')
    private objectivesRepository: IObjectivesRepository,
  ) {}

  async execute(group_id: number): Promise<void> {
    await this.objectivesRepository.delete(group_id);
  }
}

export { DeleteObjectiveUseCase };
