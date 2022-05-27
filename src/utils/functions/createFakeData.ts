import { client } from '@shared/infra/prisma';

export default async function createFakeData() {
  console.log('AAA');
  await client.user.createMany({
    data: [
      {
        id: 1,
        email: 'erick.capito@hotmail.com',
        name: 'Erick Nathan',
        username: 'ericknathan',
        activated: true,
        profile_picture:
          'http://res.cloudinary.com/grati-works/image/upload/v1653656614/avatars/7800ec4f3d18cf8b3f52f2e781e3fe0b-Frame%201%281%29.png.png',
        profile_picture_public_id:
          'avatars/7800ec4f3d18cf8b3f52f2e781e3fe0b-Frame 1(1).png',
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        stripe_customer_id: 'cus_LaJwopd88aW4qn',
      },
      {
        id: 2,
        email: 'ga.lucena@gmail.com',
        name: 'Gabriel Lucena',
        username: 'gabriel.lucena',
        activated: true,
        password:
          '$2a$08$9VR70V96u8/.8jtFZytLyuwdcB0As91rOCMGYNFASeIti8fx6.6bi',
      },
      {
        id: 3,
        email: 'cauasinho656@gmail.com',
        username: 'caua',
        name: 'Caua Henrique',
        password:
          '$2a$08$utdt5BaXEsfoNZtthg7ua.2qGEI7s2FVINObfFSErNZlWjwo70/2q',
        activated: true,
        profile_picture:
          'http://res.cloudinary.com/grati-works/image/upload/v1651230938/avatars/54bc5f700dd4bf2e6dcdef1ef0abdf51-imgperfilCaua.jpeg.jpg',
        profile_picture_public_id:
          'avatars/54bc5f700dd4bf2e6dcdef1ef0abdf51-imgperfilCaua.jpeg',
      },
    ],
  });
  console.log('BBB');

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
    console.error(`[createFakeData] ${error.message}`);
  }

  await client.organization.createMany({
    data: [
      {
        id: 1,
        name: 'SENAI Jandira',
        owner_id: 1,
        color: '#DD473B',
        mode_id: 1,
      },
      {
        id: 2,
        name: 'SENAI Campinas',
        owner_id: 2,
        color: '#00AAAA',
        mode_id: 1,
      },
    ],
  });
  await client.profile.createMany({
    data: [
      {
        id: 1,
        organization_id: 1,
        user_id: 1,
        description: 'Descrição de Erick Nathan',
        graduations: 'Graduações de Erick Nathan',
        skills: 'Skills de Erick Nathan',
        points: 0,
        responsibility: 'CTO',
      },
      {
        id: 2,
        organization_id: 2,
        user_id: 1,
        description: 'Descrição de Erick Nathan',
        graduations: 'Graduações de Erick Nathan',
        skills: 'Skills de Erick Nathan',
        points: 0,
        responsibility: 'Back-end Developer',
      },
      {
        id: 3,
        organization_id: 2,
        user_id: 2,
        description: 'Descrição de Gabriel Lucena',
        graduations: 'Graduações de Gabriel Lucena',
        skills: 'Skills de Gabriel Lucena',
        points: 0,
        responsibility: 'CEO',
      },
      {
        id: 4,
        organization_id: 2,
        user_id: 3,
        description: 'Descrição de Caua Henrique',
        graduations: 'Graduações de Caua Henrique',
        skills: 'Skills de Caua Henrique',
        points: 0,
        responsibility: 'Front-end developer',
      },
    ],
  });
  await client.group.createMany({
    data: [
      {
        id: 1,
        name: 'Grupo 1',
        organization_id: 1,
        color: '#066c8f',
      },
      {
        id: 2,
        name: 'Squad Turtle',
        organization_id: 2,
        color: '#0A9A8f',
      },
    ],
  });
  await client.feedback.create({
    data: {
      id: 1,
      organization_id: 2,
      attachment:
        'https://media3.giphy.com/media/3EuAsjZDUJefK/giphy.gif?cid=ecf05e4773cl9c96lbe602h7bi9ptqhzvdqavqr36i75l8uu&rid=giphy.gif&ct=g',
      created_at: '2020-06-01T00:00:00.000Z',
      deleted_by: null,
      notifications: {
        createMany: {
          data: [
            {
              user_id: 1,
            },
          ],
        },
      },
      reactions: {
        createMany: {
          data: [
            {
              emoji: 'thumbsup',
              profile_id: 1,
            },
          ],
        },
      },
      message:
        'Nos dá autonomia pra tomada de decisões, super atencioso e quer ver a melhor versão de nós mesmos, excelente líder :)',
      emoji: 'mage',
      groups: {
        connect: [
          {
            id: 2,
          },
        ],
      },
      receivers: {
        connect: [
          {
            id: 1,
          },
        ],
      },
      tags: {
        create: {
          name: 'Resiliência',
        },
      },
      sender_id: 4,
    },
  });
}
