import { Router } from 'express';

import { GetUserProfileController } from '@modules/accounts/useCases/profile/getUserProfile/GetUserProfileController';
import { UpdateProfileController } from '@modules/accounts/useCases/profile/updateProfile/UpdateProfileController';
import { GetAccumulatedPointsController } from '@modules/accounts/useCases/profile/getAccumulatedPoints/GetAccumulatedPointsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();

const getUserProfileController = new GetUserProfileController();
const updateProfileController = new UpdateProfileController();
const getAccumulatedPointsController = new GetAccumulatedPointsController();

profileRoutes.get('/:organization_id/:id', getUserProfileController.handle);
profileRoutes.put('/:id', ensureAuthenticated, updateProfileController.handle);
profileRoutes.get(
  '/:organization_id/:id/accumulatedPoints',
  getAccumulatedPointsController.handle,
);

export { profileRoutes };
