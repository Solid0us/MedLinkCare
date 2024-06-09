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
  console.log("server action reached!");
};
