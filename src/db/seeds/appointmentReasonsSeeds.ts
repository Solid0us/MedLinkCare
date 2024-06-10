import { prisma } from "../prisma";

const seedAppointmentReasons = async () => {
  const reasons = await prisma.appointmentReasons.createMany({
    data: [
      {
        reason: "Routine Checkup",
        description: "General yearly appointment.",
        priceInCents: 25 * 1000,
      },
      {
        reason: "Illness/Concern",
        description: "Visit for concerning symptoms.",
        priceInCents: 28 * 1000,
      },
      {
        reason: "Lab Work",
        description: "Immunization and vital checks.",
        priceInCents: 35 * 1000,
      },
    ],
    skipDuplicates: true,
  });
};

export default seedAppointmentReasons;
