import { Router } from 'express';

import { usersRoutes } from './users.routes';
import { passwordRoutes } from './password.routes';
import { authenticationRoutes } from './authentication.routes';

const router = Router();

router.use('/user', usersRoutes);
router.use('/password', passwordRoutes);
router.use(authenticationRoutes);

export { router };