"use client";
import { useState } from "react";
import { HasInbox } from "../page";
import InboxList from "./InboxList";
import { Prisma } from "@prisma/client";
import ActiveMessagesView from "./ActiveMessagesView";

interface InboxViewProps {
  inbox: HasInbox;
}
const InboxView = ({ inbox }: InboxViewProps) => {
  const [messageList, setMessageList] = useState<
    Prisma.MessagesGetPayload<{
      include: { receiver: true; sender: true };
    }>[]
  >([]);
  return (
    <>
      <div className="flex flex-row gap-x-10">
        <InboxList inbox={inbox} setMessageList={setMessageList} />
        {messageList.length > 0 && (
          <ActiveMessagesView messages={messageList} />
        )}
      </div>
    </>
  );
};

export default InboxView;
