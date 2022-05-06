import { User, Organization } from '@prisma/client';

interface IOrganization extends Organization {
  organization_id: number;
}

interface IFindUserDTO extends User {
  owned_organizations: Organization[];
  organizations: IOrganization[];
}

export { IFindUserDTO };
