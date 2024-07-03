/*
  Warnings:

  - You are about to drop the column `phoneNo` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "phoneNo",
ADD COLUMN     "phoneNumber" TEXT;
