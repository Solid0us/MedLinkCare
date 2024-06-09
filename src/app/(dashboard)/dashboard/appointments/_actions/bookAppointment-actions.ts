"use server";

import { prisma } from "@/db/prisma";
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
  try {
    await prisma.appointments.update({
      where: {
        id: formData.appointmentId,
      },
      data: {
        clientsId: formData.clientsId,
        appointmentReasonsId: formData.visitReasonId,
      },
    });
  } catch (err) {
    throw new Error("Unable to book appointment.");
  }
};
