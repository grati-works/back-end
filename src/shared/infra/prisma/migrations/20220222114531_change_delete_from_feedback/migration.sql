/*
  Warnings:

  - You are about to drop the column `deleted` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "deleted",
ADD COLUMN     "deleted_by" INTEGER;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_deleted_by_fkey" FOREIGN KEY ("deleted_by") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
