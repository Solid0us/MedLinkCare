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

interface InboxViewProps {
  inbox: HasInbox;
}
const InboxView = ({ inbox }: InboxViewProps) => {
  const [selectedInbox, setSelectedInbox] = useState<string>("");
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-x-10 gap-y-5">
        <div className="hidden lg:block">
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
            <InboxList
              selectedInbox={selectedInbox}
              setSelectedInbox={setSelectedInbox}
              inbox={inbox}
            />
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
