import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserUseCase } from './GetUserUseCase';

class GetUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { organization_id, id } = request.params;
    const getUserUseCase = container.resolve(GetUserUseCase);

    const user = await getUserUseCase.execute(organization_id, id);

    delete user.password;

    return response.json({
      status: 'success',
      data: user,
    });
  };
}

export { GetUserController };
