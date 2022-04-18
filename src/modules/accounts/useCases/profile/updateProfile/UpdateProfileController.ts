import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProfileUseCase } from './UpdateProfileUseCase';

class UpdateProfileController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;
    const {
      description,
      vinculed_accounts,
      skills,
      graduations,
      responsibility,
    } = request.body;
    const getUserProfileUseCase = container.resolve(UpdateProfileUseCase);

    await getUserProfileUseCase.execute(id, {
      description,
      vinculed_accounts: {
        create: vinculed_accounts.map(({ account, provider }) => ({
          account,
          provider,
        })),
      },
      skills,
      graduations,
      responsibility,
    });

    return response.json({
      status: 'success',
    });
  };
}

export { UpdateProfileController };
