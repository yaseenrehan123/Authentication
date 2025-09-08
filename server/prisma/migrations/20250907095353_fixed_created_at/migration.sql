/*
  Warnings:

  - You are about to drop the column `verificationExpiry` on the `VerificationCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."VerificationCode" DROP COLUMN "verificationExpiry",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
