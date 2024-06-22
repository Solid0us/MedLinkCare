"use client";
import { Prisma } from "@prisma/client";
import React from "react";
import UserMessage from "./UserMessage";
import MessageInput from "./MessageInput";

interface ActiveMessagesViewProps {
  messages: Prisma.MessagesGetPayload<{
    include: { receiver: true; sender: true };
  }>[];
}

const ActiveMessagesView = ({ messages }: ActiveMessagesViewProps) => {
  return (
    <div className="h-[calc(90vh)] w-full border border-indigo-500 rounded-lg p-5 overflow-auto flex flex-col gap-5">
      {messages.toReversed().map((message) => (
        <UserMessage key={message.id} message={message} />
      ))}
      <MessageInput />
    </div>
  );
};

export default ActiveMessagesView;
