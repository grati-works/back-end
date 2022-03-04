/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ColorMode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Graduation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `GraduationStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Objective` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Privacy` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `SkillStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserTokens` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `VinculedAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "ColorMode_id_key" ON "ColorMode"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_id_key" ON "Feedback"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Graduation_id_key" ON "Graduation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GraduationStatus_id_key" ON "GraduationStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Group_id_key" ON "Group"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_id_key" ON "Objective"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_id_key" ON "Organization"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_id_key" ON "Permission"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Privacy_id_key" ON "Privacy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_id_key" ON "Reaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_id_key" ON "Skill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SkillStatus_id_key" ON "SkillStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_id_key" ON "Subscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_key" ON "Tag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_id_key" ON "UserTokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VinculedAccount_id_key" ON "VinculedAccount"("id");
