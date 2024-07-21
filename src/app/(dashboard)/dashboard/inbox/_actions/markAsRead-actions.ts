"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const markAsRead = async (senderId: string) => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    try {
      const updated = await prisma.messages.updateMany({
        where: {
          receiverId: session.user.id,
          senderId: senderId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });
      if (updated.count > 0) {
        revalidatePath("/dashboard/inbox");
      }
    } catch (err) {
      console.log(err);
    }
  }
};
