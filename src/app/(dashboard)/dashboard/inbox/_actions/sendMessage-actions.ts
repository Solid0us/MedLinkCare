"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

const sendMessage = async (params: {
  message: string;
  senderId: string;
  receiverId: string;
}) => {
  const { message, senderId, receiverId } = params;
  revalidatePath("/dashboard/inbox");
  try {
    await prisma.messages.create({
      data: {
        message,
        receiverId,
        senderId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendMessage;
