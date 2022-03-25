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
      skills: {
        connectOrCreate: skills.map(({ name, status }) => ({
          where: {
            name,
          },
          create: {
            name,
            skill_status: {
              connectOrCreate: {
                where: {
                  name: status,
                },
                create: {
                  name: status,
                },
              },
            },
          },
        })),
      },
      graduations: {
        connectOrCreate: graduations.map(({ name, status }) => ({
          where: {
            name,
          },
          create: {
            name,
            graduation_status: {
              connectOrCreate: {
                where: {
                  name: status,
                },
                create: {
                  name: status,
                },
              },
            },
          },
        })),
      },
      responsibility,
    });

    return response.json({
      status: 'success',
    });
  };
}

export { UpdateProfileController };
