import { client } from '@shared/infra/prisma';

const erickNathanData = {
  description: `Com 13 anos tive o meu primeiro contato com tecnologia e programação ao me descobrir no mundo de desenvolvimento, onde fiquei fascinado, buscando muitos materiais sobre tecnologia como HTML, CSS e Javascript, principalmente em plataformas audiovisuais como o Youtube. \n\n        Com isso, sempre levei a tecnologia e essa paixão pelos códigos como hobby, e mesmo que, com o passar dos anos, as linguagens ficassem em segundo plano para dar vasão à vida acadêmica, sempre me mantive focado em me aprofundar e conseguir impactar milhares e/ou milhões de pessoas com novas tecnologias, e de alguma forma conseguir facilitar o dia a dia usando essa habilidade tão especial, de construir facilitadores utilizando códigos.\n\nAgora, me vejo aprimorando cada vez mais meus conhecimentos técnicos e pronto para conseguir impactar cada vez mais vidas e rotinas utilizando a programação!`,
  graduations: `
    <ul>
      <li>
        <strong>Curso:</strong> Análise e Desenvolvimento de Sistemas
      </li>
      <li>
        <strong>Instituição:</strong> SENAI Jandira
      </li>
      <li>
        <strong>Ano:</strong> 2022
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
};

const gabrielLucenaData = {
  description: `Com 13 anos tive o meu primeiro contato com tecnologia e programação ao me descobrir no mundo de desenvolvimento, onde fiquei fascinado, buscando muitos materiais sobre tecnologia como HTML, CSS e Javascript, principalmente em plataformas audiovisuais como o Youtube. \n\n        Com isso, sempre levei a tecnologia e essa paixão pelos códigos como hobby, e mesmo que, com o passar dos anos, as linguagens ficassem em segundo plano para dar vasão à vida acadêmica, sempre me mantive focado em me aprofundar e conseguir impactar milhares e/ou milhões de pessoas com novas tecnologias, e de alguma forma conseguir facilitar o dia a dia usando essa habilidade tão especial, de construir facilitadores utilizando códigos.\n\nAgora, me vejo aprimorando cada vez mais meus conhecimentos técnicos e pronto para conseguir impactar cada vez mais vidas e rotinas utilizando a programação!`,
  graduations: `
    <ul>
      <li>
        <strong>Curso:</strong> Análise e Desenvolvimento de Sistemas
      </li>
      <li>
        <strong>Instituição:</strong> SENAI Informática - Santa Cecília
      </li>
      <li>
        <strong>Ano:</strong> 2019
      </li>
    </ul>
  `,
  skills: `
    <ul>
      <li>Comunicação</li>
      <li>Persistência</li>
      <li>Resiliência</li>
      <li>Autodidata</li>
    </ul>
  `,
};

const lauraData = {
  description:
    'Entrei na Universidade Tecnológica Federal do Paraná no segundo semestre de 2019 para cursar Tecnologia em Análise e Desenvolvimento de Sistemas e senti uma necessidade de compartilhar a minha rotina como estudante de desenvolvimento. Então, eu criei um twitter onde eu postava as coisas que eu fazia e aprendia no dia, tarefas do curso e coisas do tipo. Esse foi o meu primeiro contato com criação de conteúdo voltada para tecnologia e programação.\n\nEm 2020, com a pandemia, a universidade parou com as aulas. E sem essas aulas, me sobrou bastante tempo livre. Então, eu decidi começar a estudar front-end, desde então, esse tem sido o meu foco como desenvolvedora. Paralelamente a isso, eu comecei a fazer live coding e compartilhar todo esse meu processo de aprendizagem e evolução em diversas redes sociais.',
  graduations: `
    <ul>
      <li>
        <strong>Curso:</strong> Análise e Desenvolvimento de Sistemas
      </li>
      <li>
        <strong>Instituição:</strong> Universidade Tecnológica Federal do Paraná
      </li>
      <li>
        <strong>Ano:</strong> 2019
      </li>
    </ul>
  `,
  skills: `
    <ul>
      <li>Resiliência</li>
      <li>Presença em comunidades</li>
      <li>Criação de conteúdos</li>
      <li>Github Star Creator</li>
      <li>Autodidata</li>
    </ul>
  `,
};

const cauaData = {
  description:
    'Atualmente, sou um estudante em Redes de Computadores e busco me aprofundar cada vez mais na área. Sou dedicado e esforçado, sempre buscando evoluir minhas Hard e Soft Skills através de capacitações, palestras e até mesmo uma simples conversa. Gosto de ajudar e ensinar as pessoas, contribuindo cada vez mais para a evolução da equipe.',
  graduations: `
    <ul>
      <li>
        <strong>Curso:</strong> Redes de Computadores
      </li>
      <li>
        <strong>Instituição:</strong> SENAI Jandira
      </li>
      <li>
        <strong>Ano:</strong> 2021
      </li>
    </ul>
  `,
  skills: `
    <ul>
      <li>Comunicação</li>
      <li>Empatia</li>
      <li>Persistência</li>
    </ul>
  `,
};

const otherData = {
  description:
    'Desenvolvedor de Software com 6 anos de experiência em uma carreira construída em mais de 10 anos de experiência trabalhando em grandes instituições (Desenvolvedor de Software, Analista de Sistemas e Analista de Suporte), com experiência em Chatbot com IBM Watson, Backend e sólida experiência em Node.JS - Express e NestJs, Python - Flask. com bacharelado em Ciência da Computação.',
  graduations: `
    <ul>
      <li>
        <strong>Curso:</strong> Ciência da Computação
      </li>
      <li>
        <strong>Instituição:</strong> Pontifícia Universidade Católica do Paraná
      </li>
      <li>
        <strong>Ano:</strong> 2010
      </li>
    </ul>
  `,
  skills: `
    <ul>
      <li>Comunicação</li>
      <li>Persistência</li>
      <li>Resiliência</li>
      <li>Autodidata</li>
    </ul>
  `,
};

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
        name: 'EDSOFT IT',
        owner_id: 2,
        color: '#006696',
        mode_id: 1,
      },
      {
        id: 2,
        name: 'Fortbras',
        owner_id: 3,
        color: '#1455a6',
        mode_id: 1,
      },
      {
        id: 3,
        name: 'Pagtel',
        owner_id: 4,
        color: '#62aaf1',
        mode_id: 1,
      },
      {
        id: 4,
        name: 'Tailored Resources',
        owner_id: 5,
        color: '#00bfd8',
        mode_id: 1,
      },
      {
        id: 5,
        name: 'Warren',
        owner_id: 6,
        color: '#e02b57',
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
        ...erickNathanData,
        points: 120,
        responsibility: 'CTO',
      },
      {
        id: 8,
        organization_id: 2,
        user_id: 1,
        ...erickNathanData,
        points: 120,
        responsibility: 'DevRel',
      },
      {
        id: 9,
        organization_id: 3,
        user_id: 1,
        ...erickNathanData,
        points: 120,
        responsibility: 'Recusos Humanos',
      },
      {
        id: 10,
        organization_id: 4,
        user_id: 1,
        ...erickNathanData,
        points: 120,
        responsibility: 'UI/UX Designer',
      },
      {
        id: 2,
        organization_id: 5,
        user_id: 1,
        ...erickNathanData,
        points: 0,
        responsibility: 'Back-end Developer',
      },
      {
        id: 3,
        organization_id: 2,
        user_id: 2,
        ...gabrielLucenaData,
        points: 0,
        responsibility: 'CEO',
      },
      {
        id: 4,
        organization_id: 2,
        user_id: 3,
        ...cauaData,
        points: 0,
        responsibility: 'Front-end developer',
      },
      {
        id: 5,
        organization_id: 2,
        user_id: 4,
        ...lauraData,
        points: 0,
        responsibility: 'DBA',
      },
      {
        id: 6,
        organization_id: 2,
        user_id: 5,
        ...otherData,
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
      {
        id: 4,
        name: 'Squad Riders',
        organization_id: 1,
        color: '#E62C67',
      },
      {
        id: 5,
        name: 'Squad Earth',
        organization_id: 3,
        color: '#97D5FA',
      },
      {
        id: 6,
        name: 'Squad Fear',
        organization_id: 4,
        color: '#31ED86',
      },
      {
        id: 7,
        name: 'Squad Plant',
        organization_id: 5,
        color: '#A6C181',
      },
      {
        id: 8,
        name: 'Squad Fine',
        organization_id: 5,
        color: '#0187F4',
      },
      {
        id: 9,
        name: 'Squad Ignite',
        organization_id: 1,
        color: '#000000',
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
