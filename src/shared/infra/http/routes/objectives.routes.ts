import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CreateObjectiveController } from '@modules/objectives/useCases/CreateObjective/CreateObjectiveController';
import { EditObjectiveController } from '@modules/objectives/useCases/editObjective/EditObjectiveController';
import { DeleteObjectiveController } from '@modules/objectives/useCases/deleteObjective/DeleteObjectiveController';
import { GetAllObjectivesController } from '@modules/objectives/useCases/getAllObjectives/GetAllObejctivesController';

const objectiveRoutes = Router();

const createObjectiveController = new CreateObjectiveController();
const editObjectiveController = new EditObjectiveController();
const deleteObjectiveController = new DeleteObjectiveController();
const getAllObjectivesController = new GetAllObjectivesController();

objectiveRoutes.post(
  '/',
  ensureAuthenticated,
  createObjectiveController.handle,
);

objectiveRoutes.put('/', ensureAuthenticated, editObjectiveController.handle);

objectiveRoutes.delete(
  '/:group_id',
  ensureAuthenticated,
  deleteObjectiveController.handle,
);

objectiveRoutes.get(
  '/:profile_id',
  ensureAuthenticated,
  getAllObjectivesController.handle,
);

export { objectiveRoutes };
