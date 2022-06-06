import { client } from '@shared/infra/prisma';

export default async function createFakeData() {
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
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910466/avatars/Rectangle_3535_kkjfjc.png',
        profile_picture_public_id: 'avatars/Rectangle_3535_kkjfjc.png',
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
      {
        id: 4,
        email: 'laura.bernier@yahoo.com',
        name: 'Laura Bernier',
        username: 'laura.bernier',
        activated: true,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3533_kdu6um.png',
        profile_picture_public_id: 'avatars/Rectangle_3533_kdu6um.png',
      },
      {
        id: 5,
        email: 'marciasanchess@hotmail.com',
        name: 'Marcia Sanches',
        username: 'marciasanches',
        activated: true,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3531_uolsik.png',
        profile_picture_public_id: 'avatars/Rectangle_3531_uolsik.png',
      },
      {
        id: 6,
        email: 'gihermann@outlook.com',
        name: 'Giovanne Hermann',
        username: 'giovanne.hermann',
        activated: true,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910466/avatars/Rectangle_3534_qhuytk.png',
        profile_picture_public_id: 'avatars/Rectangle_3534_qhuytk.png',
      },
      {
        id: 7,
        email: 'gui.bernardo@gmail.com',
        name: 'Guilherme Bernardo',
        username: 'guibernardo',
        activated: true,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3530_mruo4g.png',
        profile_picture_public_id: 'avatars/Rectangle_3530_mruo4g.png',
      },
      {
        id: 8,
        email: 'jeansilva@gmail.com',
        name: 'Jean Silva',
        username: 'jean_silva',
        activated: true,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3532_emolvs.png',
        profile_picture_public_id: 'avatars/Rectangle_3532_emolvs.png',
      },
      {
        id: 9,
        email: 'juliabos@gmail.com',
        name: 'Julia Bosco',
        username: 'julia.bosco',
        activated: true,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3529_gth64i.png',
        profile_picture_public_id: 'avatars/Rectangle_3529_gth64i.png',
      },
      {
        id: 10,
        email: 'vitoria.camposs@terra.com.br',
        name: 'Vitoria Campos',
        username: 'vitoria.campos',
        activated: true,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        profile_picture:
          'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3528_vapnms.png',
        profile_picture_public_id: 'avatars/Rectangle_3528_vapnms.png',
      },
    ],
  });

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
    // eslint-disable-next-line no-empty
  } catch (error) {}

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
      {
        id: 3,
        name: 'Microsoft',
        owner_id: 1,
        color: '#0078D4',
        mode_id: 1,
      },
      {
        id: 4,
        name: 'Google',
        owner_id: 3,
        color: '#4285F4',
        mode_id: 1,
      },
      {
        id: 5,
        name: 'Facebook',
        owner_id: 3,
        color: '#3B5998',
        mode_id: 1,
      },
      {
        id: 6,
        name: 'Uber',
        owner_id: 2,
        color: '#000000',
      },
    ],
  });
  await client.profile.createMany({
    data: [
      {
        id: 1,
        organization_id: 1,
        user_id: 1,
        description: `Similique non qui tempora delectus et a occaecati. Et nisi id nemo sequi voluptatem vero molestiae non dolor. Aliquam ducimus voluptatum assumenda libero sequi officiis consectetur. Ipsa nihil sunt necessitatibus culpa totam dolor saepe minima est.\nQui numquam fugit repellendus sed. Rem inventore voluptatem. Ea quia eligendi velit est pariatur laborum aperiam quod. Enim consequuntur accusantium tempore beatae debitis recusandae quaerat et. Aut aut qui non dolor aliquid dolores aut voluptatem.\nNon eligendi animi. Rem occaecati ut et dolores sunt alias. Ipsam ut sunt fugiat ullam.`,
        graduations: `
          <ul>
            <li>
              <strong>Curso:</strong> Análise e Desenvolvimento de Sistemas
            </li>
            <li>
              <strong>Instituição:</strong> SENAI Jandira
            </li>
            <li>
              <strong>Ano:</strong> 2019
            </li>
          </ul>
        `,
        skills: `
          <ul>
            <li>Autodidata</li>
            <li>Empatia</li>
            <li>Resiliência</li>
            <li>Comunicação</li>
            <li>Persistência</li>
          </ul>
        `,
        points: 120,
        responsibility: 'CTO',
      },
      {
        id: 2,
        organization_id: 2,
        user_id: 1,
        description: `Similique non qui tempora delectus et a occaecati. Et nisi id nemo sequi voluptatem vero molestiae non dolor. Aliquam ducimus voluptatum assumenda libero sequi officiis consectetur. Ipsa nihil sunt necessitatibus culpa totam dolor saepe minima est.\nQui numquam fugit repellendus sed. Rem inventore voluptatem. Ea quia eligendi velit est pariatur laborum aperiam quod. Enim consequuntur accusantium tempore beatae debitis recusandae quaerat et. Aut aut qui non dolor aliquid dolores aut voluptatem.\nNon eligendi animi. Rem occaecati ut et dolores sunt alias. Ipsam ut sunt fugiat ullam.`,
        graduations: `
          <ul>
            <li>
              <strong>Curso:</strong> Análise e Desenvolvimento de Sistemas
            </li>
            <li>
              <strong>Instituição:</strong> SENAI Jandira
            </li>
            <li>
              <strong>Ano:</strong> 2019
            </li>
          </ul>
        `,
        skills: `
          <ul>
            <li>Autodidata</li>
            <li>Empatia</li>
            <li>Resiliência</li>
            <li>Comunicação</li>
            <li>Persistência</li>
          </ul>
        `,
        points: 0,
        responsibility: 'Back-end Developer',
      },
      {
        id: 3,
        organization_id: 2,
        user_id: 2,
        description:
          'Ipsam pariatur quae ex non delectus deserunt repudiandae. Aut laboriosam et. Sint quia at assumenda. Dolores nam veniam. Omnis dolor et corporis rem voluptas.\nSint occaecati corrupti est voluptatibus porro ab quisquam et. Aspernatur aliquam enim illo ipsum. Accusantium exercitationem atque. Sit vel veniam alias quo totam sapiente ducimus. Vel sunt vel officiis itaque ut vel id. Praesentium sunt aut ut dignissimos culpa neque consequatur non.\nIn reiciendis aliquam omnis omnis. Ad ratione ex vitae ipsam voluptatem rem. At harum ut asperiores laudantium ex suscipit consectetur atque.',
        graduations: 'Graduações de Gabriel Lucena',
        skills: 'Skills de Gabriel Lucena',
        points: 0,
        responsibility: 'CEO',
      },
      {
        id: 4,
        organization_id: 2,
        user_id: 3,
        description:
          'Facere deleniti ipsa quia quisquam et perferendis. Quia sit aliquam soluta totam. Sequi inventore delectus eaque tempora repudiandae. Itaque error iure. Labore mollitia rem animi et et iure culpa voluptatem.\nOccaecati fugit deserunt. Voluptatem voluptatem vero. Facere suscipit facere a expedita omnis ut veniam non. Provident fugit quidem minima ut quos. Exercitationem fugit laboriosam dolores aut sed debitis laborum. Rerum aut nihil et consectetur maiores.\nIste eligendi dolor. Corporis in tenetur itaque non iure qui ut. Qui cupiditate eos ut explicabo deserunt dolorum in nesciunt quia. Qui quia nisi eaque ipsam voluptate ad magnam error. Mollitia a sequi rem tenetur.',
        graduations: 'Graduações de Caua Henrique',
        skills: 'Skills de Caua Henrique',
        points: 0,
        responsibility: 'Front-end developer',
      },
      {
        id: 5,
        organization_id: 2,
        user_id: 4,
        description:
          'Alias aut blanditiis hic aut dolorem nostrum culpa ipsa quo. Accusamus quia similique. Laboriosam minima tenetur eos vel consequatur aspernatur explicabo. Eius voluptatem corporis architecto. Blanditiis optio molestiae odio sapiente eveniet consequatur repudiandae.\nModi dolore unde labore. Deleniti doloremque minima explicabo quidem illum. Quos quis odio magnam nobis ea.\nMolestias mollitia doloremque nam numquam error autem laudantium. Accusamus qui modi est molestiae id facilis. Temporibus repudiandae excepturi et deleniti sunt consequatur aperiam.',
        graduations: 'Graduações de Vitor Campos',
        skills: 'Skills de Vitor Campos',
        points: 0,
        responsibility: 'DBA',
      },
      {
        id: 6,
        organization_id: 2,
        user_id: 5,
        description:
          'Suscipit non occaecati dolor harum explicabo. Et non veniam. Corrupti aspernatur accusamus cupiditate molestias est. Est voluptas enim autem quia aut eaque voluptatem. Sint doloremque facilis. Velit est atque cumque veritatis quos earum recusandae provident.\nReprehenderit est laborum. Perferendis quia fuga. Voluptatem est vel. Distinctio ipsa mollitia in voluptas.\nVoluptatem consequuntur reprehenderit expedita saepe. Vel et iure assumenda. Rem aliquam voluptatem quis sequi. Eum ex blanditiis adipisci.',
      },
    ],
  });
  await client.profile.update({
    where: {
      id: 1,
    },
    data: {
      vinculed_accounts: {
        createMany: {
          data: [
            {
              id: 1,
              account: 'ericknathan',
              provider: 'github',
            },
            {
              id: 2,
              account: 'ericknathan',
              provider: 'linkedin',
            },
            {
              id: 3,
              account: 'ericknathan',
              provider: 'dribbble',
            },
          ],
        },
      },
    },
  });
  console.log(
    await client.profile.findFirst({
      where: { id: 1 },
      include: {
        vinculed_accounts: true,
      },
    }),
  );
  await client.group.createMany({
    data: [
      {
        id: 1,
        name: 'Administração',
        organization_id: 2,
        color: '#066c8f',
      },
      {
        id: 2,
        name: 'Squad Turtle',
        organization_id: 2,
        color: '#0A9A8f',
      },
      {
        id: 3,
        name: 'Squad Board',
        organization_id: 2,
        color: '#7b5444',
      },
    ],
  });
  await client.feedback.create({
    data: {
      organization_id: 2,
      attachment:
        'https://media3.giphy.com/media/3EuAsjZDUJefK/giphy.gif?cid=ecf05e4773cl9c96lbe602h7bi9ptqhzvdqavqr36i75l8uu&rid=giphy.gif&ct=g',
      created_at: '2022-05-29T00:00:00.000Z',
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
  await client.feedback.create({
    data: {
      organization_id: 2,
      attachment:
        'https://media2.giphy.com/media/yoJC2El7xJkYCadlWE/giphy.gif?cid=ecf05e47dry4nctr4kquhwvvhhoj4q7qzvpqx4ec6tasz7rn&rid=giphy.gif&ct=g',
      created_at: '2022-05-30T00:00:00.000Z',
      deleted_by: null,
      notifications: {
        createMany: {
          data: [
            {
              user_id: 5,
            },
          ],
        },
      },
      reactions: {
        createMany: {
          data: [
            {
              emoji: 'mage',
              profile_id: 2,
            },
            {
              emoji: 'mage',
              profile_id: 3,
            },
          ],
        },
      },
      message:
        'Laura entrou no time poucos dias atrás, com a entrada dela o fluxo de edições e gravações ficaram muito melhor, além do ar de profissionalismo em cada vídeo. Acredito que com ela no time conseguimos atingir as metas de vídeos e gravação.',
      emoji: 'thumbsup',
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
            id: 5,
          },
        ],
      },
      tags: {
        create: {
          name: 'Profissionalismo',
        },
      },
      sender_id: 2,
    },
  });
}
