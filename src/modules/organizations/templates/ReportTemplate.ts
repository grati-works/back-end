interface ITemplate {
  organization_name: string;
  ranking: any;
  sended_gratis: number;
  received_gratis: number;
  user_amount: number;
  start_date: string;
  end_date: string;
}

const thStyle =
  'color: #828282;font-size: .8rem;font-weight: 600;text-align: left;padding-bottom: 1rem;';

function OrganizationCreateTemplate({
  organization_name,
  ranking,
  sended_gratis,
  received_gratis,
  user_amount,
  start_date,
  end_date,
}: ITemplate) {
  return (
    // eslint-disable-next-line prefer-template
    `<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Relatório - Senai</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        color: #4b5066;
      }

      body {
        background-color: #f6f7f8;
        padding: 5rem;
      }

      header {
        display: flex;
        justify-content: space-between;
      }

      header img {
        width: 5rem;
        margin-left: 2rem;
      }

      main {
        background-color: #ffffff;
        border-radius: 5px;
        padding: 4rem 2rem;
        margin-top: -2.5rem;
        padding-bottom: 1rem;
      }

      .separator p {
        text-align: end;
      }

      .separator .line {
        width: 100%;
        height: 1px;
        background-color: #4b5066;
      }

      main > p {
        margin-top: 1.5rem;
        text-justify: auto;
      }

      .chart,
      .rankingContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        border-radius: 5px;
        margin-bottom: 2rem;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 1rem;
      }

      .chart #gratiMoves {
        width: 100vw;
        height: 14rem;
        margin: 0 auto;
      }

      .rankingTable {
        width: 100%;
        border-collapse: collapse;
      }

      thead th {
        color: #828282;
        font-size: .8rem;
        font-weight: 600;
        text-align: left;
        padding-bottom: 1rem;
      }

      p {
        color: #333333;
      }

      span {
        color: #6874e8;
      }

      td.grati, td.experience {
        font-size: .9rem;
      }

      footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 100%;
      }

      footer img {
        width: 4rem;
        margin-top: 24px;
        margin-bottom: 8px;
      }

      footer p {
        text-align: center;
        font-size: 1rem;

        color: #4b5066;
      }

      @page {
          margin: 0;
      }

      @media print {
        .chart {
          margin-bottom: 100%;
        }

        .rankingTitle {
          padding-top: 4rem;
        }
      }
    </style>
    <header>
      <img src="https://i.ibb.co/zmTnnV0/Logo.png" alt="Logo Grati" />
      <p>1</p>
    </header>
    <main>
      <h1>Relatórios - ${organization_name}</h1>
      <div class="separator">
        <p>Período de <time>${start_date}</time> à <time>${end_date}</time></p>
        <div class="line"></div>
      </div>
      <p>
        No período de ${start_date} à ${end_date} foram registrados ${user_amount} novos
        usuários em sua organização, em conjunto aos anteriores, eles
        movimentaram um total de ${sended_gratis} grati’s.
      </p>
      <h2>Movimentação de grati's</h2>
      <div class="chart">
        <canvas id="gratiMoves"></canvas>
      </div>
      <h2 class="rankingTitle">Ranking de usuários</h2>
      <div class="rankingContainer">
        <table class="rankingTable">
          <thead style="margin-top: 1rem;">
            <tr>
              <th style="width: 5rem;${thStyle}">POSIÇÃO</th>
              <th style="${thStyle}">USUÁRIO</th>
              <th style="${thStyle}">GRATI'S</th>
              <th style="${thStyle}">EXPERIÊNCIA</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </main>
    <footer>
      <img src="https://i.ibb.co/zmTnnV0/Logo.png" alt="Grati" />
      <p>© 2022 GRATI</p>
      <p>TODOS OS DIREITOS RESERVADOS</p>
    </footer>
    <script
      src="https://cdn.jsdelivr.net/npm/chart.js"
      type="text/javascript"
    ></script>
    <script>
      const ctx = document.getElementById('gratiMoves');
      const gratiMoves = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['${sended_gratis} Enviados', '${received_gratis} Recebidos'],
          datasets: [
            {
              label: '# movimentados',
              data: [${sended_gratis}, ${received_gratis}],
              backgroundColor: ['#2D3142', '#6874E8'],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          animation: false,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
            }
          }
        },
      });
    </script>
    <script>
      const rankingContainer = document.querySelector(
        '.rankingContainer tbody',
      );
      const users = JSON.parse('${JSON.stringify(ranking)}');
      users.forEach((profile, position) => {
        const rankingCard = document.createElement('tr');
        rankingCard.classList.add('cardContainer');
        rankingCard.style.padding = '1rem';
        rankingCard.style.borderBottom = '0.5rem solid #FFFFFF';
        rankingCard.style.backgroundColor = '#f6f7f8';
        rankingCard.innerHTML = \`
          <td style="height: 4.5rem;background-color: #f6f7f8;display: flex;justify-content: center;align-items: center;border-right: 4px solid #FFF;border-radius: 5px 0px 0px 5px;">\${position + 1}</td>
            <td style="height: 4.5rem;background-color: #f6f7f8;" style="padding: 0 1.3rem;">
              <div style="display: flex;align-items: center;gap: 1rem;">
                <img
                  src="\${profile.user.profile_picture || 'https://www.pasrc.org/sites/g/files/toruqf431/files/styles/freeform_750w/public/2021-03/blank-profile-picture_0.jpg?itok=iSBmDxc8'}"
                  alt="Imagem de perfil"
                  style="width: 3rem;border-radius: 2rem;"
                />
                <div>
                  <p class="name" style="margin: 0;font-weight: 600;font-size: 1rem;color: #333333;">\${profile.user.name}</p>
                  <div style="display: flex;align-items: center;gap: 0.5rem;">
                    <p style="margin: 0;font-size: 0.9rem;color: #333333;">Nível \${profile.level}</p>
                  </div>
                </div>
              </div>
            </td>
            <td style="height: 4.5rem;background-color: #ffffff;"><span style="color: #6874e8;">\${profile.received_feedbacks}</span> recebidos</td>
            <td style="height: 4.5rem;background-color: #ffffff;border-radius: 0px 5px 5px 0px;"><span style="color: #6874e8;">\${profile.points}</span> xp</td>
        \`;
        rankingContainer.appendChild(rankingCard);
      });
    </script>
  </body>
</html>`
  );
}

export { OrganizationCreateTemplate };
