-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Tutor', 'Admin');

-- AlterTable: convert existing string values to enum
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "Role" USING (
  CASE
    WHEN "role" = 'Admin' THEN 'Admin'::"Role"
    WHEN "role" = 'Tutor' THEN 'Tutor'::"Role"
    ELSE 'Student'::"Role"
  END
);
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'Student'::"Role";
