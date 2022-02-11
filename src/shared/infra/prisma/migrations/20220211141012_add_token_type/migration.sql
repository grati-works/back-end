/*
  Warnings:

  - Added the required column `type` to the `UserTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTokens" ADD COLUMN     "type" TEXT NOT NULL;
