/*
  Warnings:

  - You are about to drop the column `validated_At` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validated_At",
ADD COLUMN     "validated_at" TIMESTAMP(3);
