"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { SetStateAction } from "react";
import { HasInbox } from "../page";
import { markAsRead } from "../_actions/markAsRead-actions";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";

interface InboxListProps {
  selectedInbox: string;
  setSelectedInbox: React.Dispatch<SetStateAction<string>>;
  inbox: HasInbox;
}
const InboxList = ({
  inbox,
  selectedInbox,
  setSelectedInbox,
}: InboxListProps) => {
  const { data: session } = useSession();
  const handleSelectInbox = (userId: string) => {
    setSelectedInbox(userId);
    markAsRead(userId);
  };

  const countUnread = (
    messages: Prisma.MessagesGetPayload<{
      include: { receiver: true; sender: true };
    }>[]
  ) => {
    let unRead = 0;
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].isRead && messages[i].receiverId === session?.user.id) {
        unRead++;
      }
    }
    return unRead;
  };

  const determineUnreadText = (
    messages: Prisma.MessagesGetPayload<{
      include: { receiver: true; sender: true };
    }>[]
  ) => {
    let numberUnread = countUnread(messages);
    if (numberUnread > 0) {
      return (
        <div className="flex flex-row justify-center items-center rounded-full w-6 h-6 bg-purple-500 text-center text-sm text-white">
          {numberUnread}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col">
      {Object.keys(inbox).map((key) => (
        <Card
          onClick={() => handleSelectInbox(key)}
          key={key}
          className={`w-60 max-w-full border-violet-500 hover:cursor-pointer ${
            selectedInbox === key && "bg-violet-100"
          }`}
        >
          <CardHeader>
            <CardTitle>
              {inbox[key].name} {determineUnreadText(inbox[key].messages)}
            </CardTitle>
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
