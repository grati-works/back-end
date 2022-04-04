import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateObjectiveController } from '@modules/objectives/useCases/CreateObjective/CreateObjectiveController';
import { EditObjectiveController } from '@modules/objectives/useCases/editObjective/EditObjectiveController';
import { DeleteObjectiveController } from '@modules/objectives/useCases/deleteObjective/DeleteObjectiveController';
import { GetAllObjectivesController } from '@modules/objectives/useCases/getAllObjective/GetAllObejctiveController';

const objectiveRoutes = Router();

const createObjectiveController = new CreateObjectiveController();
const editObjectiveController = new EditObjectiveController();
const deleteObjectiveController = new DeleteObjectiveController();
const getAllObjectivesController = new GetAllObjectivesController();

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

objectiveRoutes.delete(
  '/delete/:group_id',
  ensureAuthenticated,
  deleteObjectiveController.handle,
);

objectiveRoutes.get(
  '/:group_id',
  ensureAuthenticated,
  getAllObjectivesController.handle,
);

export { objectiveRoutes };
