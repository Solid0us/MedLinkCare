"use client";
import SendIcon from "@mui/icons-material/Send";
import { useMutation } from "@tanstack/react-query";
import sendMessage from "../_actions/sendMessage-actions";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface MessageInputProps {
  inboxId: string;
  bottomOfMessageBoxRef: React.RefObject<HTMLDivElement>;
}

const MessageInput = ({
  inboxId,
  bottomOfMessageBoxRef,
}: MessageInputProps) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const { mutateAsync: mutateSendMessage } = useMutation({
    mutationKey: ["sendMessage", inboxId],
    mutationFn: () =>
      sendMessage({
        message,
        senderId: session?.user.id ?? "",
        receiverId: inboxId,
      }),
    onSuccess: () => {
      setMessage("");
      bottomOfMessageBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    },
  });
  return (
    <div className="w-11/12 md:w-5/6 bg-white border-2 flex flex-row items-center justify-between border-violet-300 rounded-lg p-3 ml-auto mr-auto mt-auto sticky bottom-0">
      <textarea
        className="w-full h-auto focus:outline-none text-wrap resize-none"
        placeholder="Send a message..."
        rows={3}
        maxLength={2000}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <div
        onClick={() => mutateSendMessage()}
        className="rounded-full hover:bg-violet-200 p-2 h-fit"
      >
        <SendIcon />
      </div>
    </div>
  );
};

export default MessageInput;
