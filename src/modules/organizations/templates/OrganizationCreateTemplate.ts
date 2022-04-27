import { defaultTemplate } from '@utils/mail/defaultTemplate';

interface ITemplate {
  name: string;
  link: string;
  organization_name: string;
}

function OrganizationCreateTemplate({
  name,
  link,
  organization_name,
}: ITemplate) {
  return defaultTemplate({
    title: 'Organização criada',
    text: `Olá, <b>${name}</b>. A organização ${organization_name} foi criada com sucesso, para configurá-la clique no botão abaixo:`,
    button: {
      text: 'Configurar organização',
      url: link,
    },
  });
}

export { OrganizationCreateTemplate };
