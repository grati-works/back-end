interface ITemplate {
  name: string;
  link: string;
}

function ForgotPasswordTemplate({ name, link }: ITemplate) {
  return `
      <!DOCTYPE html>
      <html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
          <style>
            .container {
                max-width: 680px;
                font-family: 'Inter', Arial, Helvetica, sans-serif;
                padding: 81px 48px 32px 48px;
                background-color: #F6F7F8;
                margin: auto;
                
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .subcontainer img {
                position: relative;
                padding-bottom: 25px;
                margin-top: -40px;
                width: 5rem;
                margin-bottom: -2rem;
            }
            
            .separator {
                height: .5px;
                background-color: #4B5066;
            }

            .subcontainer {
                background-color: #FFFFFF;
                padding: 20px 40px;
                color: #47474D;
                displaY: flex;
                flex-direction: column;
                gap: 18px;
            }

            .subcontainer > * {
                width: 100%;
            }

            .subcontainer h1 {
                font-weight: bold;
                font-size: 28px;
                color: #2D3142;
            }
            
            .subcontainer p {
                font-size: 16px;
                line-height: 19px;
                color: #4B5066;
            }
            
            .subcontainer button {
                width: 100%;
                background: #6874E8;
                padding: 18px 0;
                text-decoration: none;
                border: none;
                margin: 10px 0;
                cursor: pointer;
                
                font-weight: bold;
                font-size: 20px;
                line-height: 24px;
                text-align: center;
                color: #F4F5F6;
            }
            
            .subcontainer span {
                font-size: 12px;
                text-align: center;
                color: #4B5066;
                display: block;
            }

            .container > img {
                width: 2rem;
                margin-top: 24px;
                margin-bottom: 8px;
            }

            .container > p {
                font-size: 12px;
                line-height: 0;

                color: #4B5066;
            }
          </style>
        </head>
        <body>

            <div class="container">
                <div class="subcontainer">
                    <img src="https://i.ibb.co/zmTnnV0/Logo.png" alt="Grati"/>
                    <h1>Recuperação de senha</h1>
                    <div class="separator"></div>
                    <p>Olá, <b>${name}</b>. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar tortor lobortis sit sed cursus. Id dui pellentesque lectus nunc. Sed vel malesuada placerat risus maecenas.</p>
                    <a href="${link}"><button>Alterar senha</button></a>
                    <span>Id nec donec elit fames aliquam egestas sagittis diam convallis. Pretium.</span>
                </div>
                
                <img src="https://i.ibb.co/zmTnnV0/Logo.png" alt="Grati">
                <p>© 2022 GRATI</p>
                <p>TODOS OS DIREITOS RESERVADOS</p>
            </div>
        </body>
      </html>
    `;
}

export { ForgotPasswordTemplate };
