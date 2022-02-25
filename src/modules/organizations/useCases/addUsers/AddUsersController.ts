import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddUsersUseCase } from './AddUsersUseCase';

class AddUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { organization_id, users } = request.body;

    const addUsersUseCase = container.resolve(AddUsersUseCase);

    await addUsersUseCase.execute({
      organizationId: organization_id,
      authorId: user.id,
      users,
    });

    return response.json({
      status: 'success',
      message: 'Users added successfully',
    });
  }
}

export { AddUsersController };
