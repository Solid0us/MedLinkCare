import { prisma } from "./prisma";
import seedAppointmentReasons from "./seeds/appointmentReasonsSeeds";
import seedAppointments from "./seeds/appointmentSeeds";
import seedLocations from "./seeds/locationsSeed";
import { seedMessages } from "./seeds/messageSeeds";
import seedRoles from "./seeds/roleSeeds";
import seedUsers from "./seeds/userSeeds";

const seed = async () => {
  await seedRoles();
  await seedUsers();
  await seedLocations();
  await seedAppointments();
  await seedAppointmentReasons();
  await seedMessages();
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
