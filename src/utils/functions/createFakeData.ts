import { client } from '@shared/infra/prisma';
import axios from 'axios';

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

const roles = [
  'CTO',
  'Back-end developer',
  'Front-end developer',
  'Full-stack developer',
  'CEO',
  'Product Manager',
  'Human Resources',
  'UX/UI Designer',
];

const users = [
  {
    id: 1,
    email: 'erick.capito@hotmail.com',
    name: 'Erick Nathan',
    username: 'ericknathan',
    profile_picture:
      'http://res.cloudinary.com/grati-works/image/upload/v1653656614/avatars/7800ec4f3d18cf8b3f52f2e781e3fe0b-Frame%201%281%29.png.png',
    profile_picture_public_id:
      'avatars/7800ec4f3d18cf8b3f52f2e781e3fe0b-Frame 1(1).png',
    stripe_customer_id: 'cus_LaJwopd88aW4qn',
    profile: {
      ...erickNathanData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 2,
    email: 'ga.lucena@gmail.com',
    name: 'Gabriel Lucena',
    username: 'gabriel.lucena',
    password: '$2a$08$9VR70V96u8/.8jtFZytLyuwdcB0As91rOCMGYNFASeIti8fx6.6bi',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910466/avatars/Rectangle_3535_kkjfjc.png',
    profile_picture_public_id: 'avatars/Rectangle_3535_kkjfjc.png',
    profile: {
      ...gabrielLucenaData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 3,
    email: 'cauasinho656@gmail.com',
    username: 'caua',
    name: 'Caua Henrique',
    password: '$2a$08$utdt5BaXEsfoNZtthg7ua.2qGEI7s2FVINObfFSErNZlWjwo70/2q',
    profile_picture:
      'http://res.cloudinary.com/grati-works/image/upload/v1651230938/avatars/54bc5f700dd4bf2e6dcdef1ef0abdf51-imgperfilCaua.jpeg.jpg',
    profile_picture_public_id:
      'avatars/54bc5f700dd4bf2e6dcdef1ef0abdf51-imgperfilCaua.jpeg',
    profile: {
      ...cauaData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 4,
    email: 'laura.bernier@yahoo.com',
    name: 'Laura Bernier',
    username: 'laura.bernier',
    password: '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3533_kdu6um.png',
    profile_picture_public_id: 'avatars/Rectangle_3533_kdu6um.png',
    profile: {
      ...lauraData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 5,
    email: 'marciasanchess@hotmail.com',
    name: 'Marcia Sanches',
    username: 'marciasanches',
    password: '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3531_uolsik.png',
    profile_picture_public_id: 'avatars/Rectangle_3531_uolsik.png',
    profile: {
      ...otherData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 6,
    email: 'gihermann@outlook.com',
    name: 'Giovanne Hermann',
    username: 'giovanne.hermann',
    password: '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910466/avatars/Rectangle_3534_qhuytk.png',
    profile_picture_public_id: 'avatars/Rectangle_3534_qhuytk.png',
    profile: {
      ...otherData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 7,
    email: 'gui.bernardo@gmail.com',
    name: 'Guilherme Bernardo',
    username: 'guibernardo',
    password: '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3530_mruo4g.png',
    profile_picture_public_id: 'avatars/Rectangle_3530_mruo4g.png',
    profile: {
      ...otherData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 8,
    email: 'jeansilva@gmail.com',
    name: 'Jean Silva',
    username: 'jean_silva',
    password: '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3532_emolvs.png',
    profile_picture_public_id: 'avatars/Rectangle_3532_emolvs.png',
    profile: {
      ...otherData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 9,
    email: 'juliabos@gmail.com',
    name: 'Julia Bosco',
    username: 'julia.bosco',
    password: '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3529_gth64i.png',
    profile_picture_public_id: 'avatars/Rectangle_3529_gth64i.png',
    profile: {
      ...otherData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
  {
    id: 10,
    email: 'vitoria.camposs@terra.com.br',
    name: 'Vitoria Campos',
    username: 'vitoria.campos',
    password: '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
    profile_picture:
      'https://res.cloudinary.com/grati-works/image/upload/v1653910465/avatars/Rectangle_3528_vapnms.png',
    profile_picture_public_id: 'avatars/Rectangle_3528_vapnms.png',
    profile: {
      ...otherData,
      points: () => parseInt((Math.random() * 100).toString()),
      responsibility: () => roles[Math.floor(Math.random() * roles.length)],
    },
  },
];

const organizations = [
  {
    id: 1,
    name: 'EDSOFT IT',
    owner_id: 2,
    color: '#006696',
    users: [
      ...users.slice(
        Math.floor(Math.random() * users.length),
        Math.floor(Math.random() * users.length) + 5,
      ),
      users.find(user => user.id === 2),
    ],
    groups: [
      {
        name: 'Squad Earth',
        color: '#97D5FA',
      },
    ],
    randomNumber: Math.floor(Math.random() * 1000),
  },
  {
    id: 2,
    name: 'Fortbras',
    owner_id: 3,
    color: '#1455a6',
    users: [
      ...users.slice(
        Math.floor(Math.random() * users.length),
        Math.floor(Math.random() * users.length) + 5,
      ),
      users.find(user => user.id === 3),
    ],
    groups: [
      {
        name: 'Administração',
        color: '#066c8f',
      },
      {
        name: 'Squad Turtle',
        color: '#0A9A8f',
      },
      {
        name: 'Squad Board',
        color: '#7b5444',
      },
    ],
    randomNumber: Math.floor(Math.random() * 1000),
  },
  {
    id: 3,
    name: 'Pagtel',
    owner_id: 4,
    color: '#62aaf1',
    users: [
      ...users.slice(
        Math.floor(Math.random() * users.length),
        Math.floor(Math.random() * users.length) + 5,
      ),
      users.find(user => user.id === 4),
    ],
    groups: [
      {
        name: 'Squad Riders',
        color: '#E62C67',
      },
      {
        name: 'Squad Ignite',
        color: '#000000',
      },
    ],
    randomNumber: Math.floor(Math.random() * 1000),
  },
  {
    id: 4,
    name: 'Tailored Resources',
    owner_id: 5,
    color: '#00bfd8',
    users: [
      ...users.slice(
        Math.floor(Math.random() * users.length),
        Math.floor(Math.random() * users.length) + 5,
      ),
      users.find(user => user.id === 5),
    ],
    groups: [
      {
        name: 'Squad Fear',
        color: '#31ED86',
      },
    ],
    randomNumber: Math.floor(Math.random() * 1000),
  },
  {
    id: 5,
    name: 'Warren',
    owner_id: 1,
    color: '#e02b57',
    users: [
      ...users.slice(
        Math.floor(Math.random() * users.length),
        Math.floor(Math.random() * users.length) + 5,
      ),
      users.find(user => user.id === 1),
    ],
    groups: [
      {
        name: 'Squad Plant',
        color: '#A6C181',
      },
      {
        name: 'Squad Fine',
        color: '#0187F4',
      },
    ],
    randomNumber: Math.floor(Math.random() * 1000),
  },
];

const messages = [
  {
    message:
      'Nos dá autonomia pra tomada de decisões, super atencioso e quer ver a melhor versão de nós mesmos, excelente líder :)',
    tags: ['Resiliência'],
    attachment:
      'https://media3.giphy.com/media/3EuAsjZDUJefK/giphy.gif?cid=ecf05e4773cl9c96lbe602h7bi9ptqhzvdqavqr36i75l8uu&rid=giphy.gif&ct=g',
  },
  {
    message:
      'Entrou no time poucos dias atrás, com sua entrada o fluxo de edições e gravações ficaram muito melhor, além do ar de profissionalismo em cada vídeo. Acredito que conosco no time conseguimos atingir as metas de vídeos e gravação.',
    tags: ['Reciprocidade'],
    attachment:
      'https://media2.giphy.com/media/yoJC2El7xJkYCadlWE/giphy.gif?cid=ecf05e47dry4nctr4kquhwvvhhoj4q7qzvpqx4ec6tasz7rn&rid=giphy.gif&ct=g',
  },
  {
    message:
      'Neste semestre tivemos o privilégio de ter mais um projeto concluído com sucesso, graças ao nosso gestor. Mesmo nossa equipe passando por dificuldades e problemas rotineiros, esteve ao nosso lado para nos auxiliar durante todo o trajeto.',
    tags: ['Confiança'],
    attachment: 'https://media4.giphy.com/media/WoRFcCl7cINtZcz7dC/giphy.webp',
  },
  {
    message:
      'Desejo que o seu retorno a empresa seja benéfico para a empresa. Espero que tenha se recuperado da sua cirurgia de catarata. E mãos a obra para mais um projeto.',
    tags: ['Excelência'],
    attachment:
      'https://media1.giphy.com/media/3oz8xAFtqoOUUrsh7W/200w.webp?cid=ecf05e47xu0z8aoe028olz99q22ywziu4cyx9bjv9dpbx3bc&rid=200w.webp&ct=g',
  },
  {
    message:
      'O seu afastamento deixara nossa equipe desfavorecida pois sua presença e habilidades técnicas são incríveis e de eminentemente importância para o funcionamento da empresa.',
    tags: ['Consideração'],
    attachment:
      'https://media1.giphy.com/media/ISOckXUybVfQ4/giphy.gif?cid=ecf05e47fz6dslru6tge6hx90pqtvxzfn9pcw0thlqvs17oz&rid=giphy.gif&ct=g',
  },
  {
    message:
      'O lanche que você forneceu para a pausa de ontem foi excelente. Todos nós amamos os bolinhos e a limonada Suíça que sua mãe preparou.',
    tags: ['Afeto'],
    attachment:
      'https://media1.giphy.com/media/l2YWCPLrCIaNc9QT6/200.webp?cid=ecf05e47xu0z8aoe028olz99q22ywziu4cyx9bjv9dpbx3bc&rid=200.webp&ct=g',
  },
  {
    message:
      'Quero agradecer a todos vocês pela festa surpresa que preparam para mim, de verdade eu não esperava, e sou imensamente agradecida pelo carinho e afeto que tiverem e tem por mim.',
    tags: ['Carinho'],
    attachment: 'https://media3.giphy.com/media/9DyRSxpjO3sc2iXds2/200.webp',
  },
  {
    message:
      'Obrigado por todos os que estão aqui. Eu tenho muito orgulho de ter conseguido conectar com vocês. Eles são muito importantes para o nosso sucesso.',
    tags: ['Agradecimento'],
    attachment:
      'https://media2.giphy.com/media/l4HodBpDmoMA5p9bG/200w.webp?cid=ecf05e47l943ousjz1cgt43o97hfty89mr22uicktw5knhr1&rid=200w.webp&ct=g',
  },
  {
    message:
      'Cinco adjetivos pra descrever ainda é muito pouco. Que pessoa incrível, com diversos tipos de inteligência, com um baita coração. O impacto que faz em você é só um pouquinho do que entrega pro mundo.',
    tags: ['Impacto'],
    attachment: 'https://media2.giphy.com/media/51msWHqr8drws/200w.webp',
  },
  {
    message:
      'Manda muito na UI! Muito criativo, sempre traz novas ideias e as telas ficam impecáveis. Ele faz até parecer fácil (mas não é haha)',
    tags: ['Profissionalismo'],
    attachment:
      'https://media4.giphy.com/media/MaHrgxlveq1yMVlr24/200.webp?cid=ecf05e47uj42w6wd95ykyw3ben8ddmgr1lx9ykz8jwk3fcbi&rid=200.webp&ct=g',
  },
];

const reactions = ['thumbsup', 'mage', 'grin', 'heart'];

export default async function createFakeData() {
  await client.user.createMany({
    data: users.map(
      ({
        id,
        email,
        name,
        username,
        profile_picture,
        profile_picture_public_id,
      }) => ({
        id,
        email,
        name,
        username,
        password:
          '$2a$08$meG9k3g7/P.kSfAowZofauyTt95PKghvRJkUfcpmdkYlPBdhutu4u',
        activated: true,
        profile_picture,
        profile_picture_public_id,
      }),
    ),
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

  for (const organization of organizations) {
    // console.log(
    //   organization.groups.map(
    //     (group, index) =>
    //       Math.round(organization.id * 2) + index + organization.randomNumber,
    //   ),
    // );
    // console.log(
    //   organization.users.map(
    //     user =>
    //       Math.round(organization.id * 2) + user.id + organization.randomNumber,
    //   ),
    // );

    await client.organization.create({
      data: {
        id: organization.id,
        name: organization.name,
        owner_id: organization.owner_id,
        color: organization.color,
        mode_id: 1,
        users: {
          createMany: {
            data: organization.users.map(user => ({
              id:
                Math.round(organization.id * 2) +
                user.id +
                organization.randomNumber,
              user_id: user.id,
              description: user.profile.description,
              graduations: user.profile.graduations,
              skills: user.profile.graduations,
              responsibility: user.profile.responsibility(),
              points: user.profile.points(),
            })),
            skipDuplicates: true,
          },
        },
        groups: {
          createMany: {
            data: organization.groups.map((group, index) => ({
              id:
                Math.round(organization.id * 2) +
                index +
                organization.randomNumber,
              name: group.name,
              color: group.color,
            })),
            skipDuplicates: true,
          },
        },
      },
    });

    console.log('Created organization: ', organization.name);
  }

  messages.map(async message => {
    console.log('Creating message: ', message.tags[0]);
    const organization =
      organizations[Math.floor(Math.random() * organizations.length)];
    const randomReceiver =
      organization.users[Math.floor(Math.random() * organization.users.length)];
    const randomSender =
      organization.users[Math.floor(Math.random() * organization.users.length)];

    if (!randomSender) {
      return;
    }

    const randomReceiverProfileId =
      Math.round(organization.id * 2) +
      randomReceiver.id +
      organization.randomNumber;
    const randomSenderProfileId =
      Math.round(organization.id * 2) +
      randomSender.id +
      organization.randomNumber;

    await client.feedback.create({
      data: {
        organization_id: organization.id,
        attachment: message.attachment,
        created_at: '2022-05-29T00:00:00.000Z',
        deleted_by: null,
        notifications: {
          create: {
            user: {
              connect: {
                id: randomReceiver.id,
              },
            },
          },
        },
        reactions: {
          createMany: {
            data: [
              {
                emoji: reactions[Math.floor(Math.random() * reactions.length)],
                profile_id: randomSenderProfileId,
              },
            ],
          },
        },
        message: message.message,
        emoji: reactions[Math.floor(Math.random() * reactions.length)],
        groups: {
          connect: [
            {
              id:
                Math.round(organization.id * 2) +
                Math.floor(Math.random() * organization.groups.length) +
                organization.randomNumber,
            },
          ],
        },
        receivers: {
          connect: {
            id: randomReceiverProfileId,
          },
        },
        tags: {
          connectOrCreate: {
            create: {
              name: message.tags[0],
            },
            where: {
              name: message.tags[0],
            },
          },
        },
        sender_id: randomSenderProfileId,
      },
    });
  });

  const profiles = await client.profile.findMany({
    include: {
      user: true,
    },
  });

  profiles.forEach(async profile => {
    await axios.post(
      `${process.env.SEARCH_SERVICE_URL}/user/${profile.organization_id}/${profile.id}`,
      {
        name: profile.user.name,
        username: profile.user.username,
        responsibility: profile.responsibility,
        about: profile.description.replace(/(<([^>]+)>)/gi, ''),
        skills: profile.skills.replace(/(<([^>]+)>)/gi, ''),
        graduations: profile.graduations.replace(/(<([^>]+)>)/gi, ''),
      },
    );
  });
}
