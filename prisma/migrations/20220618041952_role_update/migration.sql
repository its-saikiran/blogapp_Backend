-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'BLOGGER', 'USER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';
