import { Router, Response } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureOrganizationAuthor } from '@shared/infra/http/middlewares/ensureOrganizationAuthor';

import { CreateOrganizationController } from '@modules/organizations/useCases/createOrganization/CreateOrganizationController';
import { EditOrganizationController } from '@modules/organizations/useCases/editOrganization/EditOrganizationController';
import { AddUsersController } from '@modules/organizations/useCases/addUsers/AddUsersController';
import { AddUsersViaCSVController } from '@modules/organizations/useCases/addUsers/AddUsersViaCSVController';
import { RemoveUserController } from '@modules/organizations/useCases/removeUser/RemoveUserController';
import { ShowRankingController } from '@modules/organizations/useCases/showRanking/ShowRankingController';
import { GenerateMonthReportsController } from '@modules/organizations/useCases/generateMonthReports/GenerateMonthReportsController';
import { ListUsersController } from '@modules/organizations/useCases/listUsers/ListUsersController';
import { GetOrganizationInfoController } from '@modules/organizations/useCases/getOrganizationInfo/GetOrganizationInfoController';

const organizationRoutes = Router();

const uploadUsers = multer(uploadConfig);

const createOrganizationController = new CreateOrganizationController();
const editOrganizationController = new EditOrganizationController();
const addUsersController = new AddUsersController();
const addUsersViaCsvController = new AddUsersViaCSVController();
const removeUserController = new RemoveUserController();
const showRankingController = new ShowRankingController();
const generateMonthReportsController = new GenerateMonthReportsController();
const listUsersController = new ListUsersController();
const getOrganizationInfoController = new GetOrganizationInfoController();

organizationRoutes.post(
  '/',
  ensureAuthenticated,
  createOrganizationController.handle,
);
organizationRoutes.patch(
  '/:organization_id',
  ensureAuthenticated,
  editOrganizationController.handle,
);
organizationRoutes.post(
  '/:organization_id/users',
  ensureAuthenticated,
  addUsersController.handle,
);
organizationRoutes.post(
  '/:organization_id/users/csv',
  uploadUsers.single('file'),
  ensureAuthenticated,
  addUsersViaCsvController.handle,
);
organizationRoutes.delete(
  '/:organization_id/users/:user_id',
  ensureAuthenticated,
  removeUserController.handle,
);
organizationRoutes.get(
  '/:organization_id/ranking',
  ensureAuthenticated,
  showRankingController.handle,
);
organizationRoutes.get(
  '/:organization_id/reports',
  ensureAuthenticated,
  generateMonthReportsController.handle,
);
organizationRoutes.get(
  '/:organization_id/users',
  ensureAuthenticated,
  listUsersController.handle,
);
organizationRoutes.get(
  '/:organization_id',
  ensureAuthenticated,
  getOrganizationInfoController.handle,
);
organizationRoutes.get(
  '/is-owner/:organization_id',
  ensureAuthenticated,
  ensureOrganizationAuthor,
  (_, response: Response) => {
    response.send(true);
  },
);

export { organizationRoutes };
