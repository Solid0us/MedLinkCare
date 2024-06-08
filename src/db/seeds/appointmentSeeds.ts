import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { addDays, addMonths, addMinutes, addHours } from "date-fns";
import { start } from "repl";

const seedAppointments = async () => {
  const healthcareProviders = await prisma.users.findMany({
    where: {
      UserRoles: {
        some: {
          roles: {
            role: "healthcareProvider",
          },
        },
      },
    },
  });

  const locations = await prisma.locations.findMany();

  let appointments: Prisma.AppointmentsCreateManyInput[] = [];

  for (let i = 0; i < healthcareProviders.length; i++) {
    const today = new Date();
    let startingDate = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth() + 1,
        today.getUTCDay(),
        14,
        0
      )
    );
    const randomLocationIndex = Math.floor(Math.random() * locations.length);
    appointments.push(
      {
        providersId: healthcareProviders[i].id,
        startDate: startingDate,
        endDate: addHours(startingDate, 0.5),
        locationsId: locations[randomLocationIndex].id,
      },
      {
        providersId: healthcareProviders[i].id,
        startDate: addHours(startingDate, 3),
        endDate: addHours(startingDate, 3.5),
        locationsId: locations[randomLocationIndex].id,
      },
      {
        providersId: healthcareProviders[i].id,
        startDate: addDays(startingDate, 5),
        endDate: addDays(addHours(startingDate, 0.5), 5),
        locationsId: locations[randomLocationIndex].id,
      },
      {
        providersId: healthcareProviders[i].id,
        startDate: addDays(addHours(startingDate, 3), 5),
        endDate: addDays(addHours(startingDate, 3.5), 5),
        locationsId: locations[randomLocationIndex].id,
      },
      {
        providersId: healthcareProviders[i].id,
        startDate: addDays(startingDate, 10),
        endDate: addDays(addHours(startingDate, 0.5), 10),
        locationsId: locations[randomLocationIndex].id,
      },
      {
        providersId: healthcareProviders[i].id,
        startDate: addDays(addHours(startingDate, 3), 10),
        endDate: addDays(addHours(startingDate, 3.5), 10),
        locationsId: locations[randomLocationIndex].id,
      }
    );
  }
  const createdAppointments = await prisma.appointments.createMany({
    data: appointments,
    skipDuplicates: true,
  });
};

export default seedAppointments;
