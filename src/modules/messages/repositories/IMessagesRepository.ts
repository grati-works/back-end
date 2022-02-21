interface CreateOptionalArgs {
  attachement?: string;
  emoji?: string;
}
interface IMessagesRepository {
  send(
    author_id: number,
    receivers_ids: number[],
    tags: string[],
    message: string,
    { attachement, emoji }: CreateOptionalArgs,
  ): Promise<void>;
  react(author_id: number, feedback_id: number, emoji: string): Promise<void>;
  delete(author_id: number, feedback_id: number): Promise<void>;
}

export { CreateOptionalArgs, IMessagesRepository };
