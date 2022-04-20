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

    const vinculedAccounts =
      vinculed_accounts !== undefined
        ? {
            create: vinculed_accounts.map(vinculed_account => {
              if (vinculed_account !== null) {
                return {
                  account: vinculed_account.account,
                  provider: vinculed_account.provider,
                };
              }
            }),
          }
        : undefined;

    await getUserProfileUseCase.execute(id, {
      description,
      vinculed_accounts: vinculedAccounts,
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
