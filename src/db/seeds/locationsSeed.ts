import { prisma } from "../prisma";

const seedLocations = async () => {
  const locations = await prisma.locations.createMany({
    data: [
      {
        address: "123 Canyon Road",
      },
      {
        address: "543 Shakespear Drive",
      },
      {
        address: "448 Digital Drive",
      },
      {
        address: "2903 Lake Road",
      },
      {
        address: "2842 Mountain Road",
      },
    ],
    skipDuplicates: true,
  });
};

export default seedLocations;
