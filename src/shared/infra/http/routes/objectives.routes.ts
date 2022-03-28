import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateObjectiveController } from '@modules/objectives/useCases/CreateObjective/CreateObjectiveController';
import { EditObjectiveController } from '@modules/objectives/useCases/editObjective/EditObjectiveController';

const objectiveRoutes = Router();

const createObjectiveController = new CreateObjectiveController();
const editObjectiveController = new EditObjectiveController();

objectiveRoutes.post(
  '/create',
  ensureAuthenticated,
  createObjectiveController.handle,
);

objectiveRoutes.post(
  '/update',
  ensureAuthenticated,
  editObjectiveController.handle,
);

export { objectiveRoutes };
