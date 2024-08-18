"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/prisma";
import { getServerSession } from "next-auth";

const getTotalUnreadMessages = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const unread = await prisma.messages.findMany({
      where: {
        receiverId: session?.user.id,
        isRead: false,
      },
    });
    return unread;
  }
  return [];
};

export default getTotalUnreadMessages;
