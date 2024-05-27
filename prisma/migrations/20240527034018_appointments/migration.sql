-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "clientsId" TEXT NOT NULL,
    "providersId" TEXT NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_providersId_fkey" FOREIGN KEY ("providersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
