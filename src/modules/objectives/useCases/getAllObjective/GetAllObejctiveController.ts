import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllObjectivesUseCase } from './GetAllObjectiveUseCase';

class GetAllObjectivesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params;
    const idGroup = Number(group_id);

    const getAllObjectivesUseCase = container.resolve(GetAllObjectivesUseCase);

    const objectives = await getAllObjectivesUseCase.execute(idGroup);

    return response.json(objectives);
  }
}

export { GetAllObjectivesController };
