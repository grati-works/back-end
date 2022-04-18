import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddUserUseCase } from './AddUserUseCase';

class AddUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id, group_id } = request.params;
    const { email } = request.body;

    const addUserUseCase = container.resolve(AddUserUseCase);

    await addUserUseCase.execute(
      Number(organization_id),
      Number(group_id),
      email,
    );

    return response.status(201).send();
  }
}

export { AddUserController };
