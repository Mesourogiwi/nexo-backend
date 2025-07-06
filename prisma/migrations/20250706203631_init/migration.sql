-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "RatingType" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "DebilitiesType" AS ENUM ('VISION', 'NEURODIVERGENT', 'PHYSICAL', 'HEARING');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "downvote" INTEGER NOT NULL DEFAULT 0,
    "ratingType" "RatingType" NOT NULL,
    "debilty" "DebilitiesType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "number" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "type" "AddressType" NOT NULL,
    "ratingId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
