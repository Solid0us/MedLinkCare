"use server";

import { prisma } from "@/db/prisma";

const getMessages = async (userId: string) => {
  const messages = await prisma.messages.findMany({
    where: {
      OR: [
        {
          receiverId: userId,
        },
        {
          senderId: userId,
        },
      ],
    },
    orderBy: {
      date: "desc",
    },
    include: {
      receiver: true,
      sender: true,
    },
  });
  return messages;
};

export default getMessages;
