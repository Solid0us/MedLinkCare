import { prisma } from "./prisma";

const seed = async () => {
  const createdRoles = await prisma.roles.createMany({
    data: [
      { role: "admin" },
      { role: "client" },
      {
        role: "healthcareProvider",
      },
    ],
    skipDuplicates: true,
  });
  console.log(`Roles seeded: ${createdRoles.count}`);
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
