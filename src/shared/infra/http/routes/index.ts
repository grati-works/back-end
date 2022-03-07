import { Router } from 'express';

import { userRoutes } from './user.routes';
import { profileRoutes } from './profile.routes';
import { messageRoutes } from './message.routes';
import { organizationRoutes } from './organization.routes';
import { groupRoutes } from './group.routes';
import { passwordRoutes } from './password.routes';
import { authenticationRoutes } from './authentication.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/message', messageRoutes);
router.use('/organization', organizationRoutes);
router.use('/group', groupRoutes);
router.use('/password', passwordRoutes);
router.use(authenticationRoutes);

export { router };
