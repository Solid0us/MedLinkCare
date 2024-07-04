"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/prisma";

const getUserAppointments = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const appointments = await prisma.appointments.findMany({
      where: {
        clientsId: session.user.id,
      },
      include: {
        providers: true,
        appointmentReasons: true,
        locations: true,
      },
      orderBy: {
        startDate: "asc",
      },
    });
    return appointments;
  }
  return [];
};

export default getUserAppointments;
