/*
  Warnings:

  - You are about to drop the column `expires_in` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_ref]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "expires_in",
DROP COLUMN "price",
ADD COLUMN     "price_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "acquired_at" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_payment_ref_key" ON "Subscription"("payment_ref");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
