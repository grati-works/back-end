import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ActivateAccountUseCase } from './ActivateAccountUseCase';

class ActivateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;

    const activateAccountUseCase = container.resolve(ActivateAccountUseCase);

    await activateAccountUseCase.execute(`${token}`);

    return response.send('Account activated successfully');
  }
}

export { ActivateAccountController };
