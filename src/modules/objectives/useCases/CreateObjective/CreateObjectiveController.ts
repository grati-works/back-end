import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateObjectiveUseCase } from './CreateObjectiveUseCase';

class CreateObjectiveController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { group_id, name, goal, expires_in } = request.body;

    const createObjectiveUseCase = container.resolve(CreateObjectiveUseCase);

    await createObjectiveUseCase.execute(group_id, name, goal, expires_in);

    return response.status(201).json('Objective created successfully');
  }
}
export { CreateObjectiveController };
