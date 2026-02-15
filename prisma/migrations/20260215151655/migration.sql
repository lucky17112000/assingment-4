/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `TutorProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tutorId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "tutorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "tutorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TutorProfile" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TutorProfile_userId_key" ON "TutorProfile"("userId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorProfile" ADD CONSTRAINT "TutorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
