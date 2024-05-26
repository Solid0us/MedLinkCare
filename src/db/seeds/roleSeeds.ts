import { prisma } from "../prisma";

const seedRoles = async () => {
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
}

export default seedRoles