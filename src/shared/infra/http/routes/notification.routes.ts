import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CountNotificationController } from '@modules/notifications/useCases/countNotification/CountNotificationController';

const notificationRoutes = Router();

const countNotificationController = new CountNotificationController();

notificationRoutes.get(
  '/',
  ensureAuthenticated,
  countNotificationController.handle,
);

export { notificationRoutes };
