-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_organization_id_fkey";

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "organization_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
