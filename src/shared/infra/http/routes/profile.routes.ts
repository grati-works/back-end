import { Router } from 'express';

import { GetUserProfileController } from '@modules/accounts/useCases/profile/getUserProfile/GetUserProfileController';

const profileRoutes = Router();

const getUserProfileController = new GetUserProfileController();

profileRoutes.get('/:organization_id/:id', getUserProfileController.handle);

export { profileRoutes };
