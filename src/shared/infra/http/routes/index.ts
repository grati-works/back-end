import { Router } from 'express';

import { userRoutes } from './user.routes';
import { profileRoutes } from './profile.routes';
import { messageRoutes } from './message.routes';
import { notificationRoutes } from './notification.routes';
import { objectiveRoutes } from './objectives.routes';
import { organizationRoutes } from './organization.routes';
import { groupRoutes } from './group.routes';
import { passwordRoutes } from './password.routes';
import { authenticationRoutes } from './authentication.routes';
import { paymentRoutes } from './payment.routes';
import { searchRoutes } from './search.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/message', messageRoutes);
router.use('/notification', notificationRoutes);
router.use('/objective', objectiveRoutes);
router.use('/organization', organizationRoutes);
router.use('/group', groupRoutes);
router.use('/password', passwordRoutes);
router.use('/payment', paymentRoutes);
router.use(authenticationRoutes);
router.use('/search', searchRoutes);

export { router };
