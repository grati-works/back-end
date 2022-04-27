import { defaultTemplate } from '@utils/mail/defaultTemplate';

interface ITemplate {
  name: string;
  link: string;
  organization_name: string;
}

function CreateAccountTemplate({ name, link, organization_name }: ITemplate) {
  return defaultTemplate({
    title: 'Criação de conta',
    text: `Olá, <b>${name}</b>. A organização ${organization_name} criou seu usuário grati, para configurar sua conta clique no botão abaixo:`,
    button: {
      text: 'Configurar conta',
      url: link,
    },
  });
}

export { CreateAccountTemplate };
