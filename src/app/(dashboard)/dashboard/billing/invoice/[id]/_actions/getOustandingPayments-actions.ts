"use server";

import { prisma } from "@/db/prisma";

export const getOustandingPaymentsActions = async (userId: string) => {
  const invoices = await prisma.appointmentInvoices.findMany({
    include: {
      appointmentPayments: true,
      appointmentInvoiceDetails: {
        include: {
          appointmentReasons: true,
        },
      },
    },
    where: {
      usersId: userId,
    },
  });
  let totalDueInCents = 0;
  for (let i = 0; i < invoices.length; i++) {
    const invoiceTotalInCents = invoices[i].appointmentInvoiceDetails
      .map((data) => Number(data.lineTotalInCents))
      .reduce((prev, curr) => prev + curr, 0);

    const totalPaid = invoices[i].appointmentPayments
      .map((data) => Number(data.amountPaidInCents))
      .reduce((prev, curr) => prev + curr, 0);
    const amountLeft = invoiceTotalInCents - totalPaid;
    totalDueInCents += amountLeft;
  }
  console.log(totalDueInCents);
  return invoices;
};
