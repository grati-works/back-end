import { Prisma, Feedback } from '@prisma/client';

interface CreateOptionalArgs {
  attachment?: string;
  emoji?: string;
}

interface SendArgs {
  author_id: number;
  organization_id: number;
  receivers_ids: number[];
  tags: string[];
  message: string;
  attachments?: CreateOptionalArgs;
}
interface IMessagesRepository {
  send(args: SendArgs): Promise<void>;
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

export { SendArgs, CreateOptionalArgs, IMessagesRepository };
