/*
  Warnings:

  - A unique constraint covering the columns `[reason]` on the table `AppointmentReasons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[startDate,endDate,providersId]` on the table `Appointments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AppointmentReasons_reason_key" ON "AppointmentReasons"("reason");

-- CreateIndex
CREATE UNIQUE INDEX "uniqueAppointmentCompositeKey" ON "Appointments"("startDate", "endDate", "providersId");

-- CreateIndex
CREATE UNIQUE INDEX "Locations_address_key" ON "Locations"("address");
