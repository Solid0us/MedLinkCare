import { prisma } from "../prisma";

const seedAppointmentReasons = async () => {
  const reasons = await prisma.appointmentReasons.createMany({
    data: [
      {
        reason: "Routine Checkup",
        description: "General yearly appointment.",
      },
      {
        reason: "Illness/Concern",
        description: "Visit for concerning symptoms.",
      },
      {
        reason: "Lab Work",
        description: "Immunization and vital checks.",
      },
    ],
    skipDuplicates: true,
  });
};

export default seedAppointmentReasons;
