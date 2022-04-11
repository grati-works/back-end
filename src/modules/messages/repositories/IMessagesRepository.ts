import { Prisma, Feedback, Reaction } from '@prisma/client';

interface CreateOptionalArgs {
  attachment?: string;
  emoji?: string;
}

interface SendArgs {
  author_id: number;
  groups: number[];
  organization_id: number;
  receivers_usernames: string[];
  tags: string[];
  message: string;
  attachments?: CreateOptionalArgs;
}

interface ListResponse {
  feedbacks: Feedback[];
  reacted_feedbacks: Reaction[];
}

interface ListArgs {
  filter?: Prisma.FeedbackWhereInput;
  skip?: number;
  profile_id?: number;
}
interface IMessagesRepository {
  send(args: SendArgs): Promise<number>;
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
  list({
    filter,
    skip,
    profile_id,
  }: ListArgs): Promise<ListResponse | Feedback[]>;
  findById(feedback_id: number): Promise<Feedback>;
}

export {
  SendArgs,
  CreateOptionalArgs,
  ListArgs,
  ListResponse,
  IMessagesRepository,
};
