-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_clientsId_fkey";

-- AlterTable
ALTER TABLE "Appointments" ALTER COLUMN "clientsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
