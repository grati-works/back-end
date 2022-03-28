import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditObjectiveUseCase } from './EditObjectiveUseCase';

class EditObjectiveController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { group_id, name, goal, expires_in } = request.body;

    const editObjectiveUseCase = container.resolve(EditObjectiveUseCase);

    await editObjectiveUseCase.execute(group_id, name, goal, expires_in);

    return response.status(201).json('Objective edited successfully');
  }
}
export { EditObjectiveController };
