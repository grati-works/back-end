import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';
import { client } from '@shared/infra/prisma';

export async function ensureOrganizationAuthor(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;
  const { organization_id } = request.params;

  try {
    const isAuthorOfOrganization = await client.organization.findFirst({
      where: {
        id: Number(organization_id),
        owner_id: Number(id),
      },
    });

    if (!isAuthorOfOrganization) {
      throw new AppError('You are not the owner of this organization.', 401);
    } else {
      next();
    }
  } catch {
    throw new AppError('You are not the owner of this organization.', 401);
  }
}
