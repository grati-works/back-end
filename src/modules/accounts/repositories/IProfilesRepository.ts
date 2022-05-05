import { Prisma, Profile } from '@prisma/client';

interface IProfilesRepository {
  create(data: Prisma.ProfileCreateInput): Promise<Profile>;
  update(
    id: number,
    data: Prisma.ProfileUpdateInput,
  ): Promise<Prisma.Prisma__ProfileClient<object>>;
  findById(
    id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Prisma.Prisma__ProfileClient<object>>;
  findProfileByUserAndOrganizationId(
    organization_id: number,
    user_id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Prisma.Prisma__ProfileClient<any>>;
  addPoints(id: number, points: number): Promise<void>;
  getAccumulatedPoints(
    profile_id: number,
    start_date: Date,
    end_date: Date,
  ): Promise<number>;
  findProfileByUsernameAndOrganizationId(
    username: string,
    organization_id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<Prisma.Prisma__ProfileClient<any>>;
  findManyByUserAndOrganizationId(
    user_ids: number[],
    organization_id: number,
    select?: Prisma.ProfileSelect,
  ): Promise<object[]>;
}

export { IProfilesRepository };
