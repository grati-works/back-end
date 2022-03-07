import { inject, injectable } from 'tsyringe';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import {
  SendArgs,
  IMessagesRepository,
} from '@modules/messages/repositories/IMessagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

@injectable()
class SendMessageUseCase {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute(data: SendArgs): Promise<void> {
    const { author_id, organization_id } = data;
    const author =
      await this.profilesRepository.findProfileByUserAndOrganizationId(
        Number(organization_id),
        Number(author_id),
      );

    if (!author) {
      throw new Error('Author not found');
    }

    if (data.attachments.attachment) {
      await this.storageProvider.save(
        data.attachments.attachment,
        'attachments',
      );
    }

    await this.messagesRepository.send(data).then(async () => {
      await this.profilesRepository.addPoints(author_id, 5);
      data.receivers_ids.map(async receiver_id => {
        await this.profilesRepository.addPoints(receiver_id, 10);
      });
    });
  }
}

export { SendMessageUseCase };
