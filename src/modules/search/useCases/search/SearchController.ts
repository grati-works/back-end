import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SearchUseCase } from './SearchUseCase';

class SearchController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id } = request.params;
    const { q: query } = request.query;

    const searchUseCase = container.resolve(SearchUseCase);

    const users = await searchUseCase.execute({
      organization_id,
      query,
    });

    return response.send(users);
  }
}

export { SearchController };
