import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateOrganizationUseCase } from './CreateOrganizationUseCase';

class CreateOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user || request.params;
    const { name } = request.body;
    const createOrganizationUseCase = container.resolve(
      CreateOrganizationUseCase,
    );

    await createOrganizationUseCase.execute(id, name);

    return response.status(201).json('Organization created successfully');
  }
}

export { CreateOrganizationController };
