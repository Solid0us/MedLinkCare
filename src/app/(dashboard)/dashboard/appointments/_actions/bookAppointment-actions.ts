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
export const bookAppointments = async (
  prevState: FormState<BookAppointmentForm>,
  formData: FormData
): Promise<FormState<BookAppointmentForm>> => {
  const appointmentId = formData.get("appointmentId") as string;
  const clientsId = formData.get("clientsId") as string;
  const visitReasonId = formData.get("visitReasonId") as string;
  console.log(clientsId);
  return {
    errors: undefined,
    message: "success",
    fieldValues: {
      appointmentId,
      clientsId,
      visitReasonId,
    },
  };
};
