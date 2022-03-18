import { Notification } from '@prisma/client';

interface SendArgs {
  user_id: number;
  feedback_receiver_id: number;
}

interface INotificationsRepository {
  create(user_id: number, feedback_id: number): Promise<void>;
  count(user_id: number): Promise<number>;
  visualize(user_id: number): Promise<Notification[]>;
}

export { SendArgs, INotificationsRepository };
