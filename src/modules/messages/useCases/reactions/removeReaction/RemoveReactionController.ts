import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveReactionUseCase } from './RemoveReactionUseCase';

class RemoveReactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { feedback_id } = request.params;
    const { emoji } = request.body;

    const removeReactionUseCase = container.resolve(RemoveReactionUseCase);

    await removeReactionUseCase.execute(user.id, feedback_id, emoji);

    return response.status(201).send();
  }
}

export { RemoveReactionController };
