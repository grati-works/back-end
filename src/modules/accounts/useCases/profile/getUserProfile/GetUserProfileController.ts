import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserProfileUseCase } from './GetUserProfileUseCase';

class GetUserProfileController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { organization_id, id } = request.params;
    const { isPublic, getAllData } = request.query;
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

    const user = await getUserProfileUseCase.execute(
      organization_id,
      id,
      isPublic === 'true' || false,
      getAllData === 'true' || false,
    );

    return response.json(user);
  };
}

export { GetUserProfileController };
