-- AlterTable
ALTER TABLE "user" ADD COLUMN     "token" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
