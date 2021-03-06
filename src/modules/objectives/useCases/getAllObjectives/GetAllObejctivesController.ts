import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllObjectivesUseCase } from './GetAllObjectivesUseCase';

class GetAllObjectivesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { profile_id } = request.params;
    const idGroup = Number(profile_id);

    const getAllObjectivesUseCase = container.resolve(GetAllObjectivesUseCase);

    const objectives = await getAllObjectivesUseCase.execute(idGroup);

    return response.status(201).json(objectives);
  }
}

export { GetAllObjectivesController };
