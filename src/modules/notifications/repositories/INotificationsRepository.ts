interface SendArgs {
  receiver_id: number;
}

interface INotificationsRepository {
  create(receiver_id: number): Promise<void>;
  count(receiver_id: number): Promise<number>;
  visualize(receiver_id: number): Promise<void>;
}

export { SendArgs, INotificationsRepository };
