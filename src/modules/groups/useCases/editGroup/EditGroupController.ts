import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditGroupUseCase } from './EditGroupUseCase';

class EditGroupController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { group_id } = request.params;
    const { name, color, permissions, objective } = request.body;

    const editGroupUseCase = container.resolve(EditGroupUseCase);

    await editGroupUseCase.execute(group_id, {
      name,
      color,
      permissions,
      objective,
    });

    return response.json('Group edited successfully');
  }
}

export { EditGroupController };
