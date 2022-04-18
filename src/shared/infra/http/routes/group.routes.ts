import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateGroupController } from '@modules/groups/useCases/createGroup/CreateGroupController';
import { EditGroupController } from '@modules/groups/useCases/editGroup/EditGroupController';
import { DeleteGroupController } from '@modules/groups/useCases/deleteGroup/DeleteGroupController';
import { AddUserController } from '@modules/groups/useCases/addUser/AddUserController';

const groupRoutes = Router();

const createGroupController = new CreateGroupController();
const editGroupController = new EditGroupController();
const deleteGroupController = new DeleteGroupController();
const addUserController = new AddUserController();

groupRoutes.post('/', ensureAuthenticated, createGroupController.handle);
groupRoutes.patch(
  '/:group_id',
  ensureAuthenticated,
  editGroupController.handle,
);
groupRoutes.delete(
  '/:group_id',
  ensureAuthenticated,
  deleteGroupController.handle,
);
groupRoutes.put(
  '/:organization_id/:group_id',
  ensureAuthenticated,
  addUserController.handle,
);

export { groupRoutes };
