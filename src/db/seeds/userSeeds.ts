import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";

const seedUsers = async () => {
  const sampleProviderHashedPW = await bcrypt.hash(
    process.env.HEALTHCAREPW ?? "",
    10
  );
  const sampleClientsHashedPW = await bcrypt.hash(
    process.env.CLIENTPW ?? "",
    10
  );
  const usersData: Prisma.UsersCreateManyInput[] = [
    {
      id: "58046505-9903-47fc-a182-94da0a138d35",
      firstName: "Albert",
      lastName: "Schneider",
      email: "albertS@medlink.com",
      password: sampleProviderHashedPW,
    },
    {
      id: "609d439f-5ba1-430e-86cc-a1611bda416b",
      firstName: "Colleen",
      lastName: "Fischer",
      email: "colleenF@medlink.com",
      password: sampleProviderHashedPW,
    },
    {
      id: "609d439f-5ba1-430e-86cc-a1611bda416c",
      firstName: "Ken",
      lastName: "Jeong",
      email: "kenJ@medlink.com",
      password: sampleProviderHashedPW,
    },
    {
      id: "609d439f-5ba1-430e-86cc-a1611bda416d",
      firstName: "Elise",
      lastName: "Murray",
      email: "eliseM@medlink.com",
      password: sampleProviderHashedPW,
    },
    {
      id: "509d439f-5ba1-430e-86cc-a1611bda416d",
      firstName: "Scott",
      lastName: "Anderson",
      email: "scottA@medlink.com",
      password: sampleProviderHashedPW,
    },
    {
      id: "509e449f-5ba1-430e-86cc-a1611bda416d",
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@gmail.com",
      password: sampleClientsHashedPW,
    },
  ];
  const createdUsers = await prisma.users.createMany({
    data: usersData,
    skipDuplicates: true,
  });
  const healthcareProviderRole = await prisma.roles.findUnique({
    where: {
      role: "healthcareProvider",
    },
  });
  const clientRole = await prisma.roles.findUnique({
    where: {
      role: "client",
    },
  });
  if (healthcareProviderRole && clientRole) {
    const createdUserRoles = await prisma.userRoles.createMany({
      data: [
        {
          rolesId: healthcareProviderRole.id,
          usersId: "58046505-9903-47fc-a182-94da0a138d35",
        },
        {
          rolesId: healthcareProviderRole.id,
          usersId: "609d439f-5ba1-430e-86cc-a1611bda416b",
        },
        {
          rolesId: healthcareProviderRole.id,
          usersId: "609d439f-5ba1-430e-86cc-a1611bda416c",
        },
        {
          rolesId: healthcareProviderRole.id,
          usersId: "609d439f-5ba1-430e-86cc-a1611bda416d",
        },
        {
          rolesId: healthcareProviderRole.id,
          usersId: "509d439f-5ba1-430e-86cc-a1611bda416d",
        },
        {
          rolesId: clientRole.id,
          usersId: "509e449f-5ba1-430e-86cc-a1611bda416d",
        },
      ],
      skipDuplicates: true,
    });
  }
};

export default seedUsers;
