"use client";
import { useState } from "react";
import { HasInbox } from "../page";
import InboxList from "./InboxList";
import { Prisma } from "@prisma/client";
import ActiveMessagesView from "./ActiveMessagesView";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InboxViewProps {
  inbox: HasInbox;
}
const InboxView = ({ inbox }: InboxViewProps) => {
  const [messageList, setMessageList] = useState<
    Prisma.MessagesGetPayload<{
      include: { receiver: true; sender: true };
    }>[]
  >([]);
  const [selectedInbox, setSelectedInbox] = useState<string>("");
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-x-10 gap-y-5">
        <div className="hidden lg:block">
          <InboxList
            selectedInbox={selectedInbox}
            setSelectedInbox={setSelectedInbox}
            inbox={inbox}
            setMessageList={setMessageList}
          />
        </div>
        <Popover>
          <PopoverTrigger className="block ml-auto mr-auto border p-2 rounded-lg border-violet-300 lg:hidden">
            Open Inbox
          </PopoverTrigger>
          <PopoverContent>
            <InboxList
              selectedInbox={selectedInbox}
              setSelectedInbox={setSelectedInbox}
              inbox={inbox}
              setMessageList={setMessageList}
            />
          </PopoverContent>
        </Popover>
        {messageList.length > 0 && (
          <ActiveMessagesView messages={messageList} />
        )}
      </div>
    </>
  );
};

export default InboxView;
