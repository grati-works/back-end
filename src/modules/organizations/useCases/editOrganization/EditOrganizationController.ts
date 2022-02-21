import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EditOrganizationUseCase } from './EditOrganizationUseCase';

class EditOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { organization_id } = request.params;
    const { name, color, color_mode } = request.body;
    const editOrganizationUseCase = container.resolve(EditOrganizationUseCase);

    await editOrganizationUseCase.execute(user.id, organization_id, {
      name,
      color,
      color_mode,
    });

    return response.status(201).send();
  }
}

export { EditOrganizationController };
