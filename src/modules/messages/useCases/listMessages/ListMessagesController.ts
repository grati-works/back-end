import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListMessagesUseCase } from './ListMessagesUseCase';

class ListMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { organization_id } = request.params;
    const { page } = request.query;

    const listMessagesUseCase = container.resolve(ListMessagesUseCase);

    const messages = await listMessagesUseCase.execute(
      user.id,
      organization_id,
      Number(page),
    );

    return response.json(messages);
  }
}

export { ListMessagesController };
