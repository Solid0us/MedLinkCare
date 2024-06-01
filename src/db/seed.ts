import { prisma } from "./prisma";
import seedDaysOfWeek from "./seeds/dayOfWeekSeeds";
import seedRoles from "./seeds/roleSeeds";
import seedTimeSlots from "./seeds/timeIntervalSeeds";
import seedUsers from "./seeds/userSeeds";

const seed = async () => {
  await seedRoles();
  await seedUsers();
  await seedTimeSlots();
  await seedDaysOfWeek();
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
