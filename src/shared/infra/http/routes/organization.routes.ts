import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateOrganizationController } from '@modules/organizations/useCases/createOrganization/CreateOrganizationController';
import { AddUsersController } from '@modules/organizations/useCases/addUsers/AddUsersController';
import { AddUsersViaCSVController } from '@modules/organizations/useCases/addUsers/AddUsersViaCSVController';

const organizationRoutes = Router();

const uploadUsers = multer(uploadConfig);

const createOrganizationController = new CreateOrganizationController();
const addUsersController = new AddUsersController();
const addUsersViaCsvController = new AddUsersViaCSVController();

organizationRoutes.post('/', ensureAuthenticated, createOrganizationController.handle);
organizationRoutes.post('/users', ensureAuthenticated, addUsersController.handle);
organizationRoutes.post('/users/csv', uploadUsers.single('file'), ensureAuthenticated, addUsersViaCsvController.handle);

export { organizationRoutes };