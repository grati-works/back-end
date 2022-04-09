import { Router, Request, Response } from 'express';

const searchRoutes = Router();

searchRoutes.get('/:organization_id', (request: Request, response: Response) =>
  response.redirect(
    `${process.env.SEARCH_SERVICE_URL}/search/${request.params.organization_id}?q=${request.query.q}`,
  ),
);

searchRoutes.get(
  '/suggest/:organization_id',
  (request: Request, response: Response) =>
    response.redirect(
      `${process.env.SEARCH_SERVICE_URL}/suggest/${request.params.organization_id}?q=${request.query.q}`,
    ),
);

export { searchRoutes };
