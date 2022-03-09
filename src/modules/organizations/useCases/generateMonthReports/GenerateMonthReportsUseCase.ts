import { inject, injectable } from 'tsyringe';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import html_to_pdf from 'html-pdf-node';
import fs from 'fs';
import { OrganizationCreateTemplate } from '@modules/organizations/templates/ReportTemplate';
import { AppError } from '@shared/errors/AppError';

@injectable()
class GenerateMonthReportsUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute(
    organization_id: string,
    start_date: Date,
    end_date: Date,
  ): Promise<string> {
    const organization = await this.organizationsRepository.findById(
      Number(organization_id),
    );

    const leaderboard = await this.organizationsRepository.getRanking(
      Number(organization_id),
      { page: 0, start_date, end_date },
      true,
    );

    const options = { format: 'A4' };
    const file = {
      content: OrganizationCreateTemplate({
        start_date: start_date.toLocaleDateString('pt-BR'),
        end_date: end_date.toLocaleDateString('pt-BR'),
        organization_name: organization.name,
        ranking: leaderboard.ranking,
        sended_gratis: leaderboard.sended_feedbacks,
        received_gratis: leaderboard.received_feedbacks,
        user_amount: 16,
      }),
    };

    try {
      const pdfBuffer = await html_to_pdf.generatePdf(file, options);

      const fileName = `${organization.name}-${start_date
        .toLocaleDateString('pt-BR')
        .split('/')
        .join('-')}_${end_date
        .toLocaleDateString('pt-BR')
        .split('/')
        .join('-')}.pdf`;

      await fs.writeFileSync(`./tmp/${fileName}`, pdfBuffer);
      await this.storageProvider.save(fileName, 'reports');

      return process.env.STORAGE_PROVIDER !== 's3'
        ? `http://localhost:3333/reports/${fileName}`
        : `https://${process.env.AWS_BUCKET_URL}/reports/${fileName}`;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export { GenerateMonthReportsUseCase };
