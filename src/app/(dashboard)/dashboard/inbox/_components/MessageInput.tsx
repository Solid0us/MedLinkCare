"use client";
import SendIcon from "@mui/icons-material/Send";
const MessageInput = () => {
  return (
    <div className="w-11/12 md:w-5/6 bg-white border-2 flex flex-row items-center justify-between border-violet-300 rounded-lg p-3 ml-auto mr-auto mt-auto sticky bottom-0">
      <textarea
        className="w-full h-auto focus:outline-none text-wrap resize-none"
        placeholder="Send a message..."
        rows={3}
        maxLength={2000}
      />
      <div className="rounded-full hover:bg-violet-200 p-2 h-fit">
        <SendIcon />
      </div>
    </div>
  );
};

export default MessageInput;
