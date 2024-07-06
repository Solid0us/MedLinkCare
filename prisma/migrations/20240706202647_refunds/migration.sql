/*
  Warnings:

  - Added the required column `stripePaymentIntentId` to the `AppointmentPayments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentPayments" ADD COLUMN     "stripePaymentIntentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Refunds" (
    "id" TEXT NOT NULL,
    "refundDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amountInCents" BIGINT NOT NULL,
    "appointmentPaymentId" TEXT NOT NULL,

    CONSTRAINT "Refunds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Refunds" ADD CONSTRAINT "Refunds_appointmentPaymentId_fkey" FOREIGN KEY ("appointmentPaymentId") REFERENCES "AppointmentPayments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
