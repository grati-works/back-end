import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateObjectiveController } from '@modules/objectives/useCases/CreateObjective/CreateObjectiveController';

const objectiveRoutes = Router();

const createObjectiveController = new CreateObjectiveController();

objectiveRoutes.post(
  '/create',
  ensureAuthenticated,
  createObjectiveController.handle,
);

export { objectiveRoutes };
