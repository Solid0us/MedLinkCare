"use client";
import React, { useEffect, useRef } from "react";
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
  const bottomOfMessageBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomOfMessageBoxRef.current?.scrollIntoView({ behavior: "auto" });
  }, [inbox[selectedInbox]]);
  return (
    <div className="h-[calc(90vh)] w-full border border-indigo-500 rounded-lg p-5 overflow-auto flex flex-col gap-5">
      {inbox[selectedInbox].messages.toReversed().map((message) => (
        <UserMessage key={message.id} message={message} />
      ))}
      <MessageInput
        bottomOfMessageBoxRef={bottomOfMessageBoxRef}
        inboxId={selectedInbox}
      />
      <div ref={bottomOfMessageBoxRef} />
    </div>
  );
};

export default ActiveMessagesView;
