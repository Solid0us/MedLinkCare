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
  }, [inbox[selectedInbox].messages.length]);
  return (
    <>
      <div className="flex flex-col items-center w-full gap-3">
        <h1 className="font-bold">Messaging {inbox[selectedInbox]?.name}</h1>
        <div className="h-[calc(85vh)] w-full border border-indigo-500 rounded-lg p-5 overflow-auto flex flex-col gap-5 no-scrollbar">
          {inbox[selectedInbox] &&
            inbox[selectedInbox].messages
              .toReversed()
              .map((message) => (
                <UserMessage key={message.id} message={message} />
              ))}
          <div ref={bottomOfMessageBoxRef} />
          <MessageInput
            bottomOfMessageBoxRef={bottomOfMessageBoxRef}
            inboxId={selectedInbox}
          />
        </div>
      </div>
    </>
  );
};

export default ActiveMessagesView;
