import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AddReactionUseCase } from './AddReactionUseCase';

class AddReactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { feedback_id } = request.params;
    const { emoji } = request.body;

    const addReactionUseCase = container.resolve(AddReactionUseCase);

    await addReactionUseCase.execute(user.id, feedback_id, emoji);

    return response.status(201).send();
  }
}

export { AddReactionController };
