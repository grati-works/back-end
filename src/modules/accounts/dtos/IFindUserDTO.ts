import { User, Organization } from '@prisma/client';

interface IFindUserDTO extends User {
  owned_organizations: Organization[];
  organizations: Organization[];
}

export { IFindUserDTO };
