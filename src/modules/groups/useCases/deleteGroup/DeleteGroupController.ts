// import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteGroupUseCase } from './DeleteGroupUseCase';

class DeleteGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { groupId } = request.body;

    const deleteGroupUseCase = container.resolve(DeleteGroupUseCase);

    await deleteGroupUseCase.execute(groupId);

    return response.status(201).send();
  }
}

export { DeleteGroupController };
