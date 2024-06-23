"use client";
import { Prisma } from "@prisma/client";
import React from "react";
import UserMessage from "./UserMessage";
import MessageInput from "./MessageInput";
import { HasInbox } from "../page";

interface ActiveMessagesViewProps {
  inbox: HasInbox;
  selectedInbox: string;
}

const ActiveMessagesView = ({
  inbox,
  selectedInbox,
}: ActiveMessagesViewProps) => {
  return (
    <div className="h-[calc(90vh)] w-full border border-indigo-500 rounded-lg p-5 overflow-auto flex flex-col gap-5">
      {inbox[selectedInbox].messages.toReversed().map((message) => (
        <UserMessage key={message.id} message={message} />
      ))}
      <MessageInput inboxId={selectedInbox} />
    </div>
  );
};

export default ActiveMessagesView;
