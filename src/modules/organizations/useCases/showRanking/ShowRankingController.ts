import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowRankingUseCase } from './ShowRankingUseCase';

class ShowRankingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id } = request.params;
    const { page, start_date, end_date } = request.query;

    const showRankingUseCase = container.resolve(ShowRankingUseCase);

    const nowDate = new Date();

    const ranking = await showRankingUseCase.execute(organization_id, {
      page: Number(page) || 0,
      start_date: start_date
        ? new Date(start_date.toString())
        : new Date(nowDate.getFullYear(), nowDate.getMonth(), 1),
      end_date: end_date
        ? new Date(`${end_date.toString()}T23:59:59`)
        : new Date(nowDate.getFullYear(), nowDate.getMonth(), 31, 23, 59, 59),
    });

    return response.status(200).send(ranking);
  }
}

export { ShowRankingController };
