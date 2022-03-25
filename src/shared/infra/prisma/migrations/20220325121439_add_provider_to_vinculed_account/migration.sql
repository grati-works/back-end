/*
  Warnings:

  - Added the required column `provider` to the `VinculedAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VinculedAccount" ADD COLUMN     "provider" TEXT NOT NULL;
