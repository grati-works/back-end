/*
  Warnings:

  - Added the required column `max_users` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "max_users" INTEGER NOT NULL;
