-- CreateTable
CREATE TABLE "public"."VerificationCode" (
    "id" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "verificationExpiry" TIMESTAMP(3) NOT NULL,
    "unverifiedUserId" TEXT,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_unverifiedUserId_key" ON "public"."VerificationCode"("unverifiedUserId");

-- AddForeignKey
ALTER TABLE "public"."VerificationCode" ADD CONSTRAINT "VerificationCode_unverifiedUserId_fkey" FOREIGN KEY ("unverifiedUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
