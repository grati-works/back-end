import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveUserUseCase } from './RemoveUserUseCase';

class RemoveUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user: author } = request;
    const { organization_id, user_id } = request.body;

    const removeUserUseCase = container.resolve(RemoveUserUseCase);

    await removeUserUseCase.execute(author.id, organization_id, user_id);

    return response.status(201).send();
  }
}

export { RemoveUserController };