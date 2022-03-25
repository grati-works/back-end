import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SubscribeUseCase } from './SubscribeUseCase';

class SubscribeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { plan_duration, plan_size } = request.body;

    const subscribeUseCase = container.resolve(SubscribeUseCase);

    const session = await subscribeUseCase.execute(
      user.id,
      plan_duration,
      plan_size,
    );

    return response.json(session);
  }
}

export { SubscribeController };
