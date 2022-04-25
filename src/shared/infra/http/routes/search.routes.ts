import { SearchController } from '@modules/search/useCases/search/SearchController';
import { Router, Request, Response } from 'express';

const searchRoutes = Router();
const searchController = new SearchController();

searchRoutes.get('/:organization_id', searchController.handle);

searchRoutes.get(
  '/suggest/:organization_id',
  (request: Request, response: Response) =>
    response.redirect(
      `${process.env.SEARCH_SERVICE_URL}/suggest/${request.params.organization_id}?q=${request.query.q}`,
    ),
);

export { searchRoutes };
