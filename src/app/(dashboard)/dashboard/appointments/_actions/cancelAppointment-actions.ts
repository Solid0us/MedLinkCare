"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/prisma";

export const cancelAppointment = async (appointmentId: string) => {
  const session = await getServerSession(authOptions);
  if (session) {
    await prisma.appointments.update({
      where: {
        clientsId: session.user.id,
        id: appointmentId,
      },
      data: {
        clientsId: null,
      },
    });
    revalidatePath("/dashboard/appointments");
  } else {
    throw new Error("Unauthenticated");
  }
};
