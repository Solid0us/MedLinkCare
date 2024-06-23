"use server";
import { prisma } from "@/db/prisma";

const getHealthcareProviders = async () => {
  const providers = await prisma.users.findMany({
    where: {
      UserRoles: {
        some: {
          roles: { role: "healthcareProvider" },
        },
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
  return providers;
};

export default getHealthcareProviders;
