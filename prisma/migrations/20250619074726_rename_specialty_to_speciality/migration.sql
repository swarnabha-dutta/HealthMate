/*
  Warnings:

  - You are about to drop the column `specialty` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "specialty",
ADD COLUMN     "speciality" TEXT;
