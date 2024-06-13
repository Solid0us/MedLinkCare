import { prisma } from "../prisma";

const seedAppointmentReasons = async () => {
  const reasons = await prisma.appointmentReasons.createMany({
    data: [
      {
        reason: "Routine Checkup",
        description: "General yearly appointment.",
        priceInCents: 25 * 100,
      },
      {
        reason: "Illness/Concern",
        description: "Visit for concerning symptoms.",
        priceInCents: 28 * 100,
      },
      {
        reason: "Lab Work",
        description: "Immunization and vital checks.",
        priceInCents: 35 * 100,
      },
    ],
    skipDuplicates: true,
  });
};

export default seedAppointmentReasons;
