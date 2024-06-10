-- AlterTable
ALTER TABLE "AppointmentReasons" ADD COLUMN     "priceInCents" BIGINT NOT NULL DEFAULT 1000;

-- CreateTable
CREATE TABLE "AppointmentInvoices" (
    "id" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "usersId" TEXT NOT NULL,

    CONSTRAINT "AppointmentInvoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentInvoiceDetails" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lineTotalInCents" BIGINT NOT NULL,
    "appointmentInvoiceId" TEXT NOT NULL,
    "appointmentReasonsId" TEXT NOT NULL,

    CONSTRAINT "AppointmentInvoiceDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentPayments" (
    "id" TEXT NOT NULL,
    "amountPaidInCents" BIGINT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointmentInvoiceId" TEXT NOT NULL,

    CONSTRAINT "AppointmentPayments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentInvoices" ADD CONSTRAINT "AppointmentInvoices_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentInvoiceDetails" ADD CONSTRAINT "AppointmentInvoiceDetails_appointmentInvoiceId_fkey" FOREIGN KEY ("appointmentInvoiceId") REFERENCES "AppointmentInvoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentInvoiceDetails" ADD CONSTRAINT "AppointmentInvoiceDetails_appointmentReasonsId_fkey" FOREIGN KEY ("appointmentReasonsId") REFERENCES "AppointmentReasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentPayments" ADD CONSTRAINT "AppointmentPayments_appointmentInvoiceId_fkey" FOREIGN KEY ("appointmentInvoiceId") REFERENCES "AppointmentInvoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
