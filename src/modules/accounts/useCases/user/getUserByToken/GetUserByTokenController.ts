import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserByTokenUseCase } from './GetUserByTokenUseCase';

class GetUserByTokenController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { token, type } = request.query;
    const getUserByTokenUseCase = container.resolve(GetUserByTokenUseCase);

    const user = await getUserByTokenUseCase.execute(
      token.toString(),
      type.toString(),
    );

    delete user.password;

    return response.json(user);
  };
}

export { GetUserByTokenController };
