import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { VisualizeNotificationUseCase } from './VisualizeNotificationUseCase';

class VisualizeNotificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const user_id = Number(user.id);

    const visualizeNotificationUseCase = container.resolve(
      VisualizeNotificationUseCase,
    );

    const visualize = await visualizeNotificationUseCase.execute(user_id);

    return response.json({
      status: 'success',
      data: {
        visualize,
      },
    });
  }
}

export { VisualizeNotificationController };
