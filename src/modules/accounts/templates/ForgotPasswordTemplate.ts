import { defaultTemplate } from '@utils/mail/defaultTemplate';

interface ITemplate {
  name: string;
  link: string;
}

function ForgotPasswordTemplate({ name, link }: ITemplate) {
  return defaultTemplate({
    title: 'Recuperação de senha',
    text: `Olá, <b>${name}</b>. Para recuperar sua senha, clique no botão abaixo:`,
    button: {
      text: 'Alterar senha',
      url: link,
    },
  });
}

export { ForgotPasswordTemplate };
