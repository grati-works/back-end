import { Router } from 'express';

import { organizationRoutes } from './organization.routes';
import { userRoutes } from './user.routes';
import { passwordRoutes } from './password.routes';
import { authenticationRoutes } from './authentication.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/organization', organizationRoutes);
router.use('/password', passwordRoutes);
router.use(authenticationRoutes);

export { router };