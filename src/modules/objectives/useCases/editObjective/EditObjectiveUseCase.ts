import { inject, injectable } from 'tsyringe';
import { IObjectivesRepository } from '@modules/objectives/repositories/IObjectivesRepository';

@injectable()
class EditObjectiveUseCase {
  constructor(
    @inject('ObjectivesRepository')
    private objectivesRepository: IObjectivesRepository,
  ) {}

  async execute(
    group_id: number,
    name: string,
    goal: number,
    expires_in: string,
  ): Promise<void> {
    await this.objectivesRepository.edit(group_id, name, goal, expires_in);
  }
}

export { EditObjectiveUseCase };
