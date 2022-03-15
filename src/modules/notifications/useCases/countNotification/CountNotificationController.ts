import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CountNotificationUseCase } from './CountNotificationUseCase';

class CountNotificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const user_id = Number(user.id);

    const countNotificationUseCase = container.resolve(
      CountNotificationUseCase,
    );

    const notifications = await countNotificationUseCase.execute(user_id);

    return response.json({
      status: 'success',
      data: {
        notifications,
      },
    });
  }
}

export { CountNotificationController };
