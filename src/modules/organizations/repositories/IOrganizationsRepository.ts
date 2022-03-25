import { Organization, Prisma, Profile } from '@prisma/client';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';

interface IRankingFilter {
  page?: number;
  start_date?: Date;
  end_date?: Date;
}
interface IOrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
  update(
    organization_id: number,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<void>;
  addUser(
    organization_id: number,
    { email }: IAddUserDTO,
  ): Promise<Organization>;
  removeUser(organization_id: number, user_id: number): Promise<void>;
  findById(id: number): Promise<Organization>;
  checkIfUserIsOwner(
    user_id: number,
    organization_id: number,
  ): Promise<boolean>;
  getRanking(
    organization_id: number,
    { page, start_date, end_date }?: IRankingFilter,
    getUser?: true,
  ): Promise<{
    sended_feedbacks: number;
    received_feedbacks: number;
    ranking: Profile[];
  }>;
  getLevel(points: number): number;
  getUsers(organization_id: number): Promise<Profile[]>;
}

export { IOrganizationsRepository, IRankingFilter };
