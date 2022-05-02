import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

@injectable()
class SuggestUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(organization_id: number, query: string): Promise<string[]> {
    const users = await this.usersRepository.findByQuery(
      query,
      organization_id,
    );

    return users.map(user => user.username);
  }
}

export { SuggestUsersUseCase };
