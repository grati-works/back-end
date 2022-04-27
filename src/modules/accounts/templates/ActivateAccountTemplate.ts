import { defaultTemplate } from '@utils/mail/defaultTemplate';

interface ITemplate {
  name: string;
  link: string;
}

function ActivateAccountTemplate({ name, link }: ITemplate) {
  return defaultTemplate({
    title: 'Ativação de conta',
    text: `Olá, <b>${name}</b>. Para ativar sua conta, clique no botão abaixo:`,
    button: {
      text: 'Ativar conta',
      url: link,
    },
  });
}

export { ActivateAccountTemplate };
