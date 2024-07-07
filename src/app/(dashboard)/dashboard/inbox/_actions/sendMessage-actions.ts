"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import Filter from "bad-words";

const sendMessage = async (params: {
  message: string;
  senderId: string;
  receiverId: string;
}) => {
  const { message, senderId, receiverId } = params;
  let trimmedMessage = message.trim();
  if (trimmedMessage.length < 1) {
    return;
  }
  let filter = new Filter({ placeHolder: "*" });
  const filteredMessage = filter.clean(trimmedMessage);
  try {
    await prisma.messages.create({
      data: {
        message: filteredMessage,
        receiverId,
        senderId,
      },
    });
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/inbox");
};

export default sendMessage;
