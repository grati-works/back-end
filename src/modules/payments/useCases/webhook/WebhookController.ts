import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { WebhookUseCase } from './WebhookUseCase';

class WebhookController {
  async handle(request: Request, response: Response): Promise<Response> {
    const webhookUseCase = container.resolve(WebhookUseCase);

    const webhookResponse = await webhookUseCase.execute(request);

    return response.json({
      ok: webhookResponse,
    });
  }
}

export { WebhookController };
