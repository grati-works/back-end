import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserProfileUseCase } from './GetUserProfileUseCase';

class GetUserProfileController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

    const user = await getUserProfileUseCase.execute(id);

    delete user.password;

    return response.json(user);
  };
}

export { GetUserProfileController };
