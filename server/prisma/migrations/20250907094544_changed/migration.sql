/*
  Warnings:

  - Changed the type of `verificationCode` on the `VerificationCode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."VerificationCode" DROP COLUMN "verificationCode",
ADD COLUMN     "verificationCode" INTEGER NOT NULL;
