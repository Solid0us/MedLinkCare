"use server";

import { prisma } from "@/db/prisma";

export const getProviders = async () => {
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
