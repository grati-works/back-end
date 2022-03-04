import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowRankingUseCase } from './ShowRankingUseCase';

class ShowRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id } = request.params;

    const showRankingUseCase = container.resolve(ShowRankingUseCase);

    await showRankingUseCase.execute(organization_id);

    return response.status(201).send();
  }
}

export { ShowRankingController };
