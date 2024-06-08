"use server";

import { prisma } from "@/db/prisma";

export const bookAppointments = async (id: string, clientsId: string) => {
  await prisma.appointments.update({
    where: {
      id,
    },
    data: {
      clientsId,
    },
  });
};
