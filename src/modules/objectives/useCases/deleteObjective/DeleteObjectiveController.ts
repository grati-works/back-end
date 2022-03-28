import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteObjectiveUseCase } from './DeleteObjectiveUseCase';

class DeleteObjectiveController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params;

    const deleteObjectiveUseCase = container.resolve(DeleteObjectiveUseCase);

    await deleteObjectiveUseCase.execute(Number(group_id));

    return response.status(201).json('Objective deleted successfully');
  }
}

export { DeleteObjectiveController };
