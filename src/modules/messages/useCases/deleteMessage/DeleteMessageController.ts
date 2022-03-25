import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteMessageUseCase } from './DeleteMessageUseCase';

class DeleteMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { message_id } = request.params;

    const deleteMessageUseCase = container.resolve(DeleteMessageUseCase);

    await deleteMessageUseCase.execute(user.id, message_id);

    return response.json('Message deleted successfully');
  }
}

export { DeleteMessageController };
