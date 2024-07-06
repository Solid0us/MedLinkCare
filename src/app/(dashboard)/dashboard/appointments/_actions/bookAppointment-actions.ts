"use server";

import { prisma } from "@/db/prisma";
import { addDays } from "date-fns";
export type BookAppointmentForm = {
  appointmentId: string;
  clientsId: string;
  visitReasonId: string;
};

export type FormState<T> = {
  message: string;
  errors: Record<keyof T, string> | undefined;
  fieldValues: T;
};
export const bookAppointments = async (formData: BookAppointmentForm) => {
  const alreadyBookedAppointment = await prisma.appointments.findFirst({
    where: {
      id: formData.appointmentId,
      NOT: {
        clientsId: null,
      },
    },
  });
  if (alreadyBookedAppointment) {
    throw new Error("Appointment has already been booked.");
  }
  const appointmentReason = await prisma.appointmentReasons.findUnique({
    where: {
      id: formData.visitReasonId,
    },
  });
  if (!appointmentReason) {
    throw new Error("Appointment reason does not exist in the database.");
  }
  // Create Invoice and Invoice Details
  try {
    const transaction = await prisma.$transaction([
      prisma.appointmentInvoices.create({
        data: {
          dueDate: addDays(new Date(), 30),
          invoiceDate: new Date(),
          usersId: formData.clientsId,
          appointmentInvoiceDetails: {
            create: {
              quantity: 1,
              appointmentReasonsId: appointmentReason.id,
              lineTotalInCents: appointmentReason.priceInCents,
              appointmentId: formData.appointmentId,
            },
          },
        },
      }),
      prisma.appointments.update({
        where: {
          id: formData.appointmentId,
        },
        data: {
          clientsId: formData.clientsId,
          appointmentReasonsId: formData.visitReasonId,
        },
      }),
    ]);
    return {
      invoiceId: transaction[0].id,
      total: appointmentReason.priceInCents,
    };
  } catch (err) {
    throw new Error(
      "Could not create invoice for the appointment. Unable to book appointment."
    );
  }
};
