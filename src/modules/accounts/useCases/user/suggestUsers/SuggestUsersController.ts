import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SuggestUsersUseCase } from './SuggestUsersUseCase';

class SuggestUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id } = request.params;
    const { q: query } = request.query;

    const suggestUsersUseCase = container.resolve(SuggestUsersUseCase);

    const suggestions = await suggestUsersUseCase.execute(
      Number(organization_id),
      query.toString(),
    );

    return response.json(suggestions);
  }
}

export { SuggestUsersController };
