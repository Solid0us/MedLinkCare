"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

export const cancelAppointment = async (appointmentId: string) => {
  const session = await getServerSession(authOptions);
  if (session) {
    const invoices = await prisma.appointmentInvoices.findFirst({
      where: {
        appointmentInvoiceDetails: {
          some: {
            appointmentId,
          },
        },
      },
      include: {
        appointmentInvoiceDetails: true,
        appointmentPayments: true,
      },
    });
    if (invoices) {
      if (invoices.appointmentPayments.length > 0) {
        // Perform refund logic here
      }
      await prisma.$transaction([
        prisma.appointmentInvoices.update({
          where: {
            id: invoices.id,
          },
          data: {
            active: false,
          },
        }),
        prisma.appointments.update({
          where: {
            clientsId: session.user.id,
            id: appointmentId,
          },
          data: {
            clientsId: null,
          },
        }),
      ]);
    }
    revalidatePath("/dashboard/appointments");
  } else {
    throw new Error("Unauthenticated");
  }
};
