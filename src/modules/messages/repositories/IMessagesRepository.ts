import { Prisma, Feedback } from '@prisma/client';

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
  addReaction(
    author_id: number,
    feedback_id: number,
    emoji: string,
  ): Promise<void>;
  removeReaction(
    author_id: number,
    feedback_id: number,
    emoji: string,
  ): Promise<void>;
  delete(author_id: number, feedback_id: number): Promise<void>;
  list(filter: Prisma.FeedbackWhereInput): Promise<Feedback[]>;
}

export { CreateOptionalArgs, IMessagesRepository };
