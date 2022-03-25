import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersUseCase } from './ListUsersUseCase';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id } = request.params;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const users = await listUsersUseCase.execute(organization_id);

    return response.status(201).send(users);
  }
}

export { ListUsersController };
