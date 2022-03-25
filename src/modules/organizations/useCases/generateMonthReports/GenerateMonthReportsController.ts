import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GenerateMonthReportsUseCase } from './GenerateMonthReportsUseCase';

class GenerateMonthReportsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { organization_id } = request.params;
    const { start_date, end_date } = request.query;

    const generateMonthReportsUseCase = container.resolve(
      GenerateMonthReportsUseCase,
    );

    const file_url = await generateMonthReportsUseCase.execute(
      organization_id,
      new Date(start_date.toString()),
      new Date(end_date.toString()),
    );

    return response.status(201).send(file_url);
  }
}

export { GenerateMonthReportsController };
