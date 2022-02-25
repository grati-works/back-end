import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrganizationUseCase } from './CreateOrganizationUseCase';

class CreateOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { name } = request.body;
    const createOrganizationUseCase = container.resolve(
      CreateOrganizationUseCase,
    );

    await createOrganizationUseCase.execute(user.id, name);

    return response.status(201).json({
      status: 'success',
      message: 'Organization created successfully',
    });
  }
}

export { CreateOrganizationController };
