"use server";

import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

export type InvoicesWithPaymentsAndDetails =
  Prisma.AppointmentInvoicesGetPayload<{
    include: {
      appointmentPayments: true;
      appointmentInvoiceDetails: {
        include: {
          appointmentReasons: true;
        };
      };
    };
  }>;

export const getOustandingPaymentsActions = async (
  userId: string
): Promise<{
  totalDueInCents: number;
  unpaidInvoices: InvoicesWithPaymentsAndDetails[];
  paidInvoices: InvoicesWithPaymentsAndDetails[];
}> => {
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
      active: true,
    },
    orderBy: {
      invoiceDate: "asc",
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
  return {
    totalDueInCents,
    unpaidInvoices: invoices.filter(
      (invoice) => invoice.appointmentPayments.length === 0
    ),
    paidInvoices: invoices.filter(
      (invoice) => invoice.appointmentPayments.length > 0
    ),
  };
};
