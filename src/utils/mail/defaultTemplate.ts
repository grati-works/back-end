interface IMailTemplate {
  title: string;
  text: string;
  button: {
    text: string;
    url: string;
  };
}

export function defaultTemplate({ title, text, button }: IMailTemplate) {
  return `
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
  </head>

  <table align="center">
    <td align="center">
      <table width="100%" cellspacing="0" cellpadding="0">
        <tbody bgcolor="#F6F7F8" style="display: block; width:100%; max-width:680px; background-color:#F6F7F8; padding:81px 48px 32px 48px;" width="100%">
          <tr width="100%">
            <td>
              <img src="https://i.ibb.co/zmTnnV0/Logo.png" alt="Grati" height="80" style="margin-top:-40px; margin-left: 20px" />
            </td>
          </tr>
          <tr bgcolor="#F6F7F8" style="padding:10px; display:block; margin-top: -75px; font-family:'Inter', Arial, sans-serif; " width="100%">
            <td bgcolor="#FFFFFF" style="padding:60px 40px 0 40px; display:block;" width="88%">
              <h1 style="font-family:'Inter', Arial, sans-serif; color:#2D3142; border-bottom:.5px solid #4B5066; padding-bottom: 30px; font-size: 28px;" width="100%">${title}</h1>
            </td>
            <td bgcolor="#FFFFFF" style="display: block; margin-top:-18px; padding:20px 40px" width="88%">
              <p style="font-size: 16px; color: #4B5066;">${text}</p>
              <a href="${button.url}">
                <button style="width: 100%; background: #6874E8; padding: 18px 0; text-decoration: none; border: none; margin: 10px 0; cursor: pointer; font-weight: bold; font-size: 20px; line-height: 24px; text-align: center; color: #F4F5F6;">${
                  button.text
                }</button>
              </a>
              <span style="font-size: 12px; text-align: center; color: #4B5066; display: block; margin-top: 10px;">
                Este e-mail é enviado assim que há uma atividade no seu perfil. Caso não tenha sido você, por favor, ignore este e-mail.
              </span>
            </td>
            <td style="font-size: 12px; line-height: 0; color: #4B5066; text-align: center;" width="5%">
              <img style="width: 32px; margin-top: 24px; margin-bottom: 8px;" src="https://i.ibb.co/zmTnnV0/Logo.png" alt="Grati">
              <p>© ${new Date().getFullYear()} GRATI</p>
              <p>TODOS OS DIREITOS RESERVADOS</p>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </table>
  `;
}
