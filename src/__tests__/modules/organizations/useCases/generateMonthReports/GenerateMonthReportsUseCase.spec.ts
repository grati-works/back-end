import { GenerateMonthReportsUseCase } from '@modules/organizations/useCases/generateMonthReports/GenerateMonthReportsUseCase';
import { createFakeGroup, createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider';

let generateMonthReportsUseCase: GenerateMonthReportsUseCase;
let organizationsRepository: IOrganizationsRepository;
let storageProvider: IStorageProvider;

describe('Generate organization month reports', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    storageProvider = new LocalStorageProvider();

    generateMonthReportsUseCase = new GenerateMonthReportsUseCase(
      organizationsRepository,
      storageProvider,
    );
  });

  test.todo('should be able to add generate organization month reports');
});
