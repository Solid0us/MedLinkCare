/*
  Warnings:

  - Added the required column `locationsId` to the `Appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "appointmentReasonsId" TEXT,
ADD COLUMN     "locationsId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Locations" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentReasons" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AppointmentReasons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_appointmentReasonsId_fkey" FOREIGN KEY ("appointmentReasonsId") REFERENCES "AppointmentReasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_locationsId_fkey" FOREIGN KEY ("locationsId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
