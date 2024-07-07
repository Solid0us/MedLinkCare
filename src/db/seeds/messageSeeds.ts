import { prisma } from "../prisma";

export const seedMessages = async () => {
  const [provider, client] = await prisma.$transaction([
    prisma.users.findUnique({
      where: {
        email: "kenJ@medlink.com",
      },
    }),
    prisma.users.findUnique({
      where: {
        email: "jdoe@gmail.com",
      },
    }),
  ]);
  if (provider && client) {
    await prisma.messages.create({
      data: {
        senderId: provider.id,
        message:
          "Hello John Doe, I hope you are doing well since our last appointment.",
        receiverId: client.id,
      },
    });
  }
};
