import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateOrganizationController } from '@modules/organizations/useCases/createOrganization/CreateOrganizationController';

const organizationRoutes = Router();

const createOrganizationController = new CreateOrganizationController();

organizationRoutes.post('/', ensureAuthenticated, createOrganizationController.handle);

export { organizationRoutes };