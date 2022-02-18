import { Profile, Organization } from '@prisma/client';

interface IFindUserDTO extends Profile {
  owned_organizations: Organization[];
}

export { IFindUserDTO };
