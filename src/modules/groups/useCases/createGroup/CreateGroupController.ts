import { AppError } from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGroupUseCase } from './CreateGroupUseCase';

class CreateGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { organization_id, name, color } = request.body;

    if(!organization_id) throw new AppError('Organization id is required');
    if(!name) throw new AppError('Group name is required');

    const createGroupUseCase = container.resolve(CreateGroupUseCase);

    await createGroupUseCase.execute(user.id, organization_id, name, color);

    return response.status(201).send();
  }
}

export { CreateGroupController };
