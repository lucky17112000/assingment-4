/*
  Warnings:

  - You are about to drop the column `tutorId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `tutorId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `TutorProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tutorId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "tutorId";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "tutorId";

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "categoryId";
