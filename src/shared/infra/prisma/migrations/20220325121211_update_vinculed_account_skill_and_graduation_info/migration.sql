/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Graduation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `GraduationStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SkillStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account]` on the table `VinculedAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Graduation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `GraduationStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SkillStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account` to the `VinculedAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Graduation" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GraduationStatus" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SkillStatus" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VinculedAccount" ADD COLUMN     "account" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Graduation_name_key" ON "Graduation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GraduationStatus_name_key" ON "GraduationStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SkillStatus_name_key" ON "SkillStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VinculedAccount_account_key" ON "VinculedAccount"("account");
