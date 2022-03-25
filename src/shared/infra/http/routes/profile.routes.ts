import { Router } from 'express';

import { GetUserProfileController } from '@modules/accounts/useCases/profile/getUserProfile/GetUserProfileController';
import { UpdateProfileController } from '@modules/accounts/useCases/profile/updateProfile/UpdateProfileController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();

const getUserProfileController = new GetUserProfileController();
const updateProfileController = new UpdateProfileController();

profileRoutes.get('/:organization_id/:id', getUserProfileController.handle);
profileRoutes.post('/:id', ensureAuthenticated, updateProfileController.handle);

export { profileRoutes };
