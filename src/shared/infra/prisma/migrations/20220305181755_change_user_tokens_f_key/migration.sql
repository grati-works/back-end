-- DropForeignKey
ALTER TABLE "UserTokens" DROP CONSTRAINT "UserTokens_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "UserTokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
