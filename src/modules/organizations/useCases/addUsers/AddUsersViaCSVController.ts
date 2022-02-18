import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddUsersUseCase } from './AddUsersUseCase';

class AddUsersViaCSVController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file, user } = request;
    const { organization_id } = request.body;

    const addUsersUseCase = container.resolve(AddUsersUseCase);

    await addUsersUseCase.execute({
      organizationId: organization_id,
      authorId: user.id,
      users: file,
    });

    return response.status(201).send();
  }
}

export { AddUsersViaCSVController };
