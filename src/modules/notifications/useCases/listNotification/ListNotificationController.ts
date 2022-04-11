import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListNotificationUseCase } from './ListNotificationUseCase';

class ListNotificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const user_id = Number(user.id);

    const listNotificationUseCase = container.resolve(ListNotificationUseCase);

    const notifications = await listNotificationUseCase.execute(user_id);

    return response.json(notifications);
  }
}

export { ListNotificationController };
