/*
  Warnings:

  - Changed the type of `securityCode` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `password` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "securityCode",
ADD COLUMN     "securityCode" INTEGER NOT NULL,
DROP COLUMN "password",
ADD COLUMN     "password" INTEGER NOT NULL;
