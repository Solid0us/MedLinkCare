"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import getHealthcareProviders from "../_actions/getHealthcareProviders-actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { HasInbox } from "../page";
import { SetStateAction, useState } from "react";
import sendMessage from "../_actions/sendMessage-actions";
import { useSession } from "next-auth/react";

interface StartNewConversationProps {
  inbox: HasInbox;
  setSelectedInbox: React.Dispatch<SetStateAction<string>>;
}

const StartNewConversation = ({
  inbox,
  setSelectedInbox,
}: StartNewConversationProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const [messageForm, setMessageForm] = useState({
    message: "",
    to: "",
  });
  const { data: providers } = useQuery({
    queryKey: ["newConvoHealthcareProviders"],
    queryFn: getHealthcareProviders,
    staleTime: 60 * 1000,
    placeholderData: [],
  });

  const mutateMessage = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: () =>
      sendMessage({
        message: messageForm.message,
        receiverId: messageForm.to,
        senderId: session?.user.id ?? "",
      }),
    onSuccess: () => {
      setModalOpen(false);
      setSelectedInbox(messageForm.to);
      setMessageForm({
        message: "",
        to: "",
      });
    },
  });
  return (
    <Dialog onOpenChange={(e) => setModalOpen(e)} open={modalOpen}>
      <Button onClick={() => setModalOpen(true)}>+ New Conversation</Button>
      <DialogContent>
        <div className="flex flex-col gap-y-5 p-3">
          <div className="flex flex-row justify-center items-center gap-x-3">
            <Label>To:</Label>
            <Select
              onValueChange={(e) =>
                setMessageForm((prevState) => ({
                  ...prevState,
                  to: e,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Provider" />
              </SelectTrigger>
              <SelectContent>
                {providers
                  ?.filter(
                    (provider) => !Object.keys(inbox).includes(provider.id)
                  )
                  .map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.firstName} {provider.lastName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <textarea
            onChange={(e) =>
              setMessageForm((prevState) => ({
                ...prevState,
                message: e.target.value,
              }))
            }
            className="border rounded-lg w-full p-2 max-h-96 min-h-"
            rows={4}
            placeholder="Send a message..."
          />
        </div>
        <Button onClick={() => mutateMessage.mutateAsync()}>Send</Button>
      </DialogContent>
    </Dialog>
  );
};

export default StartNewConversation;
