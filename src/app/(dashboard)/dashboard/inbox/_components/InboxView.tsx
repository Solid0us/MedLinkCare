"use client";
import { useState } from "react";
import { HasInbox } from "../page";
import InboxList from "./InboxList";
import ActiveMessagesView from "./ActiveMessagesView";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StartNewConversation from "./StartNewConversation";

interface InboxViewProps {
  inbox: HasInbox;
}
const InboxView = ({ inbox }: InboxViewProps) => {
  const [selectedInbox, setSelectedInbox] = useState<string>("");
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-x-10 gap-y-5 h-screen">
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-5 border h-full p-3 border-purple-400 rounded-lg">
          <StartNewConversation
            inbox={inbox}
            setSelectedInbox={setSelectedInbox}
          />
          <InboxList
            selectedInbox={selectedInbox}
            setSelectedInbox={setSelectedInbox}
            inbox={inbox}
          />
        </div>
        <Popover>
          <PopoverTrigger className="block ml-auto mr-auto border p-2 rounded-lg border-violet-300 lg:hidden">
            Open Inbox
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col items-center gap-5">
              <StartNewConversation
                inbox={inbox}
                setSelectedInbox={setSelectedInbox}
              />
              <InboxList
                selectedInbox={selectedInbox}
                setSelectedInbox={setSelectedInbox}
                inbox={inbox}
              />
            </div>
          </PopoverContent>
        </Popover>
        {selectedInbox && (
          <ActiveMessagesView inbox={inbox} selectedInbox={selectedInbox} />
        )}
      </div>
    </>
  );
};

export default InboxView;
