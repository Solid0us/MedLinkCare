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
  const handleSelectInbox = (userId: string) => {
    setSelectedInbox(userId);
    markAsRead(userId);
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
