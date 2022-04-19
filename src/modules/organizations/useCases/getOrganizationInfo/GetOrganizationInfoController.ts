import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetOrganizationInfoUseCase } from './GetOrganizationInfoUseCase';

class GetOrganizationInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id } = request.params;

    const getOrganizationInfoUseCase = container.resolve(
      GetOrganizationInfoUseCase,
    );

    const organization = await getOrganizationInfoUseCase.execute(
      Number(organization_id),
    );

    return response.json(organization);
  }
}

export { GetOrganizationInfoController };
