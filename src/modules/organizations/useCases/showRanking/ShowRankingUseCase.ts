import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class ShowRankingUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(organization_id: string): Promise<void> {
    await this.usersRepository.getRanking(Number(organization_id));
  }
}

export { ShowRankingUseCase };
