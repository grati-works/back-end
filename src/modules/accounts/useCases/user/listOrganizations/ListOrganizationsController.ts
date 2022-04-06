import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOrganizationsUseCase } from './ListOrganizationsUseCase';

class ListOrganizationsController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.user;
    const listOrganizationsUseCase = container.resolve(
      ListOrganizationsUseCase,
    );

    const organizations = await listOrganizationsUseCase.execute(id);

    return response.json(organizations);
  };
}

export { ListOrganizationsController };
