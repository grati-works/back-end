import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListMessagesUseCase } from './ListMessagesUseCase';

class ListMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id, group_id } = request.params;
    const { page } = request.query;

    const listMessagesUseCase = container.resolve(ListMessagesUseCase);

    const messages = await listMessagesUseCase.execute(
      organization_id,
      Number(group_id),
      Number(page || 0),
    );

    return response.json(messages);
  }
}

export { ListMessagesController };
