import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendMessageUseCase } from './SendMessageUseCase';

class SendMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    let data = null;

    try {
      data = JSON.parse(request.body.data);
    } catch (err) {
      data = request.body.data;
    }

    const { user } = request;
    const { organization_id } = request.params;
    const {
      receivers_usernames,
      tags,
      message,
      emoji,
      groups,
      attachment_gif,
    } = data;
    const attachment_file = attachment_gif || request.file?.filename || null;

    const sendMessageUseCase = container.resolve(SendMessageUseCase);

    await sendMessageUseCase.execute({
      groups,
      author_id: Number(user.id),
      organization_id: Number(organization_id),
      receivers_usernames,
      tags,
      message,
      attachments: {
        emoji: emoji.replace(':', ''),
        attachment: attachment_file,
      },
    });

    return response.status(201).send();
  }
}

export { SendMessageController };
