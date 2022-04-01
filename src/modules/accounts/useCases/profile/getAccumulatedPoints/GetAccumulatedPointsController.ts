import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAccumulatedPointsUseCase } from './GetAccumulatedPointsUseCase';

class GetAccumulatedPointsController {
  handle = async (request: Request, response: Response): Promise<Response> => {
    const { organization_id, id } = request.params;
    const getAccumulatedPointsUseCase = container.resolve(
      GetAccumulatedPointsUseCase,
    );

    const user = await getAccumulatedPointsUseCase.execute(organization_id, id);

    return response.json(user);
  };
}

export { GetAccumulatedPointsController };
