import { inject, injectable } from 'tsyringe';
import { IProfilesRepository } from '@modules/accounts/repositories/IProfilesRepository';
import {
  SendArgs,
  IMessagesRepository,
} from '@modules/messages/repositories/IMessagesRepository';
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { AppError } from '@shared/errors/AppError';
import { IGroupsRepository } from '@modules/groups/repositories/IGroupsRepository';

@injectable()
class SendMessageUseCase {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
    @inject('GroupsRepository')
    private groupsRepository: IGroupsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  async execute(data: SendArgs): Promise<void> {
    const { author_id, organization_id } = data;
    const author =
      await this.profilesRepository.findProfileByUserAndOrganizationId(
        Number(organization_id),
        Number(author_id),
      );

    if (!author) {
      throw new AppError('Author not found', 404, 'author.not_found');
    }

    if (data.attachments.attachment) {
      await this.storageProvider.save(
        data.attachments.attachment,
        'attachments',
      );
    }

    if (data.groups.filter(group => group === 0)) {
      data.groups.splice(data.groups.indexOf(0), 1);
      const publicGroup =
        await this.groupsRepository.findByNameAndOrganizationId(
          'Público',
          organization_id,
        );
      data.groups.push(publicGroup.id);
    }
    await this.messagesRepository.send(data).then(async feedback_id => {
      await this.profilesRepository.addPoints(author_id, 5);
      data.receivers_usernames.map(async receiver_username => {
        const receiver =
          await this.profilesRepository.findProfileByUsernameAndOrganizationId(
            receiver_username,
            organization_id,
          );
        await this.profilesRepository.addPoints(receiver.id, 10);
        await this.notificationsRepository.create(receiver.id, feedback_id);
      });
    });
  }
}

export { SendMessageUseCase };
