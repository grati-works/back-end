/*
  Warnings:

  - Added the required column `name` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "color" TEXT DEFAULT E'#000000',
ADD COLUMN     "name" TEXT NOT NULL;
