/*
  Warnings:

  - You are about to drop the `Graduation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GraduationStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkillStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Graduation" DROP CONSTRAINT "Graduation_graduation_status_id_fkey";

-- DropForeignKey
ALTER TABLE "Graduation" DROP CONSTRAINT "Graduation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_skill_status_id_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_user_id_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "graduations" TEXT,
ADD COLUMN     "skills" TEXT;

-- DropTable
DROP TABLE "Graduation";

-- DropTable
DROP TABLE "GraduationStatus";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "SkillStatus";
