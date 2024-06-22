"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { HasInbox } from "../page";

interface InboxListProps {
  inbox: HasInbox;
}
const InboxList = ({ inbox }: InboxListProps) => {
  const { data } = useSession();
  return (
    <>
      {Object.keys(inbox).map((key) => (
        <Card key={key} className="max-w-60 border-violet-500">
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
    </>
  );
};

export default InboxList;
