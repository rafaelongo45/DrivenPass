-- AlterTable
ALTER TABLE "credentials" ALTER COLUMN "url" DROP DEFAULT,
ALTER COLUMN "url" SET DATA TYPE TEXT;
