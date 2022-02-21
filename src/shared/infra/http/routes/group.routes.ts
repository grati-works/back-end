import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateGroupController } from '@modules/groups/useCases/createGroup/CreateGroupController';
import { EditGroupController } from '@modules/groups/useCases/editGroup/EditGroupController';

const groupRoutes = Router();

const createGroupController = new CreateGroupController();
const editGroupController = new EditGroupController();

groupRoutes.post('/', ensureAuthenticated, createGroupController.handle);
groupRoutes.patch(
  '/:group_id',
  ensureAuthenticated,
  editGroupController.handle,
);

export { groupRoutes };
