import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserUseCase } from './GetUserUseCase';

class GetUserController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const getUserUseCase = container.resolve(GetUserUseCase);

    const user = await getUserUseCase.execute(id);

    delete user.password;

    return response.json(user);
  };
}

export { GetUserController };
