import { client } from '@shared/infra/prisma';

export default async function checkPermissions() {
  const permissions = await client.permission.findMany();
  if (permissions.length !== 3) {
    await client.permission.deleteMany();
    await client.permission.createMany({
      data: [
        {
          id: 1,
          name: 'Gerenciar mensagens',
        },
        {
          id: 2,
          name: 'Gerenciar grupos',
        },
        {
          id: 3,
          name: 'Gerenciar usuários',
        },
      ],
    });
  }
}
