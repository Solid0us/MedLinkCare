import { prisma } from "@/db/prisma";

const getAppointmentReasons = async () => {
  const reasons = await prisma.appointmentReasons.findMany();
  return reasons;
};

export default getAppointmentReasons;
