/*
  Warnings:

  - Added the required column `appointmentId` to the `AppointmentInvoiceDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentInvoiceDetails" ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AppointmentInvoiceDetails" ADD CONSTRAINT "AppointmentInvoiceDetails_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
