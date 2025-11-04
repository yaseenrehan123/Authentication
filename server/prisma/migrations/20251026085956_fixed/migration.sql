-- DropForeignKey
ALTER TABLE "public"."ResetPasswordToken" DROP CONSTRAINT "ResetPasswordToken_userId_fkey";

-- AlterTable
ALTER TABLE "public"."ResetPasswordToken" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ResetPasswordToken" ADD CONSTRAINT "ResetPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
