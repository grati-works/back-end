-- DropForeignKey
ALTER TABLE "Objective" DROP CONSTRAINT "Objective_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Objective" ADD CONSTRAINT "Objective_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
