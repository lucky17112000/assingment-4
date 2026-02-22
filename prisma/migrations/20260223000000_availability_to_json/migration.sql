-- AlterTable: change availability from TEXT to JSONB
ALTER TABLE "TutorProfile" DROP COLUMN "availability";
ALTER TABLE "TutorProfile" ADD COLUMN "availability" JSONB;
