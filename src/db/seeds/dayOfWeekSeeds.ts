import { prisma } from "../prisma";

const seedDaysOfWeek = async () => {
  const days = await prisma.dayOfWeek.createMany({
    data: [
      {
        dayOfWeek: 0,
      },
      {
        dayOfWeek: 1,
      },
      {
        dayOfWeek: 2,
      },
      {
        dayOfWeek: 3,
      },
      {
        dayOfWeek: 4,
      },
      {
        dayOfWeek: 5,
      },
      {
        dayOfWeek: 6,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Days seeded: ${days.count}`);
};

export default seedDaysOfWeek;
