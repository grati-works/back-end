import { Organization, Prisma, Profile } from '@prisma/client'
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { client } from '@shared/infra/prisma';
import { IAddUserDTO } from '@modules/organizations/dtos/IAddUserDTO';

class OrganizationsRepository implements IOrganizationsRepository {
    async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
        const organization = await client.organization.create({
            data
        });

        return organization;
    }

    async addUser(organization_id: number, user: IAddUserDTO): Promise<Organization> {
        const profile = await client.profile.findUnique({
            where: { email: user.email }
        });

        console.log({ profile })

        return await client.organization.update({
            where: { id: organization_id },
            data: {
                users: {
                    connect: {
                        id: profile.id
                    }
                }
            }
        });
    }
}

export { OrganizationsRepository };