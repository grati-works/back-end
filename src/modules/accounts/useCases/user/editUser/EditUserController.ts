import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditUserUseCase } from './EditUserUseCase';

class EditUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, username, password } = request.body;
    const editUserUseCase = container.resolve(EditUserUseCase);

    await editUserUseCase.execute(id, {
      name,
      username,
      password,
    });

    return response.status(201).send();
  }
}

export { EditUserController };
