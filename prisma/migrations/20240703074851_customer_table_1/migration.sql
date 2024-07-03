-- CreateEnum
CREATE TYPE "linkPrecedence" AS ENUM ('primary', 'secondary');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "phoneNo" TEXT,
    "email" TEXT,
    "linkedId" INTEGER,
    "linkPrecedence" "linkPrecedence" NOT NULL DEFAULT 'primary',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
