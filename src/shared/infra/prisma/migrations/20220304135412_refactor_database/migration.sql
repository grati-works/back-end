/*
  Warnings:

  - You are about to drop the column `groupId` on the `Objective` table. All the data in the column will be lost.
  - You are about to drop the column `activated` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `_OrganizationToProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[group_id]` on the table `Objective` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `group_id` to the `Objective` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToProfile" DROP CONSTRAINT "_OrganizationToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToProfile" DROP CONSTRAINT "_OrganizationToProfile_B_fkey";

-- DropIndex
DROP INDEX "Objective_groupId_key";

-- DropIndex
DROP INDEX "Profile_email_key";

-- DropIndex
DROP INDEX "Profile_username_key";

-- AlterTable
ALTER TABLE "Objective" DROP COLUMN "groupId",
ADD COLUMN     "group_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "activated",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "points",
DROP COLUMN "profile_picture",
DROP COLUMN "username",
ADD COLUMN     "organization_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_OrganizationToProfile";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT,
    "activated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_group_id_key" ON "Objective"("group_id");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Objective" ADD CONSTRAINT "Objective_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
