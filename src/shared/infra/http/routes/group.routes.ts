import { Router } from 'express';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateGroupController } from '@modules/groups/useCases/createGroup/CreateGroupController';

const groupRoutes = Router();

const createGroupController = new CreateGroupController();

groupRoutes.post('/', ensureAuthenticated, createGroupController.handle);

export { groupRoutes };