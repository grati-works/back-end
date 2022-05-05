import { client } from '@shared/infra/prisma';
import { logger } from '@utils/logger';

export default async function checkColorModes() {
  const colorModes = await client.colorMode.findMany();
  
  if (colorModes.length !== 3) {
    try {
      await client.colorMode.deleteMany();
      await client.colorMode.createMany({
        data: [
          {
            id: 1,
            name: 'light',
          },
          {
            id: 2,
            name: 'dark',
          },
          {
            id: 3,
            name: 'system',
          },
        ],
      });
    } catch (error) {
      logger.error(`[checkColorModes] ${error.message}`);
    }
  }
}
