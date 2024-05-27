import { prisma } from "./prisma";
import seedRoles from "./seeds/roleSeeds";
import seedUsers from "./seeds/userSeeds";

const seed = async () => {
  await seedRoles();
  await seedUsers()
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
