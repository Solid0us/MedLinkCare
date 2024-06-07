"use server";
import { prisma } from "@/db/prisma";
import { HasAppointmentSearch } from "../schedule-appointments/_components/FindAppointments";

export const getAvailableAppointments = async (
  appointmentSearch: HasAppointmentSearch,
  skip: number
) => {
  if (!appointmentSearch.date) {
    return [];
  } else {
    const availableAppointments = await prisma.appointments.findMany({
      where: {
        clientsId: null,
        providersId: appointmentSearch.providerId,
        AND: [
          {
            endDate: { gte: appointmentSearch.date },
          },
          {
            endDate: { gte: new Date() },
          },
        ],
      },
      orderBy: {
        startDate: "asc",
      },
      take: 10,
      skip,
    });
    return availableAppointments;
  }
};
