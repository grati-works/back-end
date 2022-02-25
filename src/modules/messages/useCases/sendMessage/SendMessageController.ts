import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendMessageUseCase } from './SendMessageUseCase';

class SendMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { organization_id } = request.params;
    const { receivers_ids, tags, message, emoji } = request.body;
    const attachment_file = request.file.filename;

    const sendMessageUseCase = container.resolve(SendMessageUseCase);

    await sendMessageUseCase.execute({
      author_id: Number(user.id),
      organization_id: Number(organization_id),
      receivers_ids: JSON.parse(receivers_ids),
      tags: JSON.parse(tags),
      message,
      attachments: {
        emoji,
        attachment: attachment_file,
      },
    });

    return response.status(201).send();
  }
}

export { SendMessageController };

/*

*/
