import { GenerateMonthReportsUseCase } from '@modules/organizations/useCases/generateMonthReports/GenerateMonthReportsUseCase';
import { createFakeProfile } from '@utils/testUtils';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/prisma/repositories/OrganizationsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

jest.spyOn(global, 'setTimeout');

let generateMonthReportsUseCase: GenerateMonthReportsUseCase;
let organizationsRepository: IOrganizationsRepository;
let storageProvider: IStorageProvider;

describe('Generate organization month reports', () => {
  beforeEach(() => {
    organizationsRepository = new OrganizationsRepository();
    storageProvider = {
      save: jest.fn(async (file: string, folder: string) => {
        return {
          public_id: 'public_id',
          url: 'url',
        };
      }),
      delete: jest.fn(),
    } as IStorageProvider;

    generateMonthReportsUseCase = new GenerateMonthReportsUseCase(
      organizationsRepository,
      storageProvider,
    );
  });

  it('should be able to add generate organization month reports', async () => {
    const { organization } = await createFakeProfile();
    const storageProviderSaveSpy = jest.spyOn(storageProvider, 'save');

    await generateMonthReportsUseCase.execute(
      organization.id.toString(),
      new Date('2020-01-01'),
      new Date(),
      1,
    );

    expect(storageProviderSaveSpy).toHaveBeenCalled();
  }, 30000);
});
