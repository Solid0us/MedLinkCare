"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { SetStateAction, useState } from "react";
import { HasInbox } from "../page";
import { Prisma } from "@prisma/client";

interface InboxListProps {
  inbox: HasInbox;
  setMessageList: React.Dispatch<
    SetStateAction<
      Prisma.MessagesGetPayload<{
        include: { receiver: true; sender: true };
      }>[]
    >
  >;
}
const InboxList = ({ inbox, setMessageList }: InboxListProps) => {
  const [selectedInbox, setSelectedInbox] = useState<string>("");
  const handleSelectInbox = (
    userId: string,
    messages: Prisma.MessagesGetPayload<{
      include: { receiver: true; sender: true };
    }>[]
  ) => {
    setMessageList(messages);
    setSelectedInbox(userId);
  };

  return (
    <div className="flex flex-col">
      {Object.keys(inbox).map((key) => (
        <Card
          onClick={() => handleSelectInbox(key, inbox[key].messages)}
          key={key}
          className={`max-w-60 border-violet-500 hover:cursor-pointer ${
            selectedInbox === key && "bg-violet-100"
          }`}
        >
          <CardHeader>
            <CardTitle>{inbox[key].name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {inbox[key].messages[0].message.slice(0, 20) + "..."}
            </CardDescription>
            <CardDescription>
              {inbox[key].messages[0].date.toLocaleString()}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InboxList;
