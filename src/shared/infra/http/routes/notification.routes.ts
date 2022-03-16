import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

import { CountNotificationController } from '@modules/notifications/useCases/countNotification/CountNotificationController';
import { VisualizeNotificationController } from '@modules/notifications/useCases/visualizeNotification/VisualizeNotificationController';

const notificationRoutes = Router();

const countNotificationController = new CountNotificationController();
const visualizeNotificationController = new VisualizeNotificationController();

notificationRoutes.get(
  '/',
  ensureAuthenticated,
  countNotificationController.handle,
);

notificationRoutes.get(
  '/visualize',
  ensureAuthenticated,
  visualizeNotificationController.handle,
);

export { notificationRoutes };
