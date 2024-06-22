import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import React from "react";
import { motion } from "framer-motion";

interface UserMessageProps {
  message: Prisma.MessagesGetPayload<{
    include: { receiver: true; sender: true };
  }>;
}
const UserMessage = ({ message }: UserMessageProps) => {
  const { data } = useSession();
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <Card
        className={`w-full md:w-1/3 pt-2 ${
          message.receiverId === data?.user.id
            ? "bg-green-300"
            : "bg-purple-300 ml-auto"
        }`}
      >
        <CardContent>
          <p>{message.message}</p>
          <CardDescription>{message.date.toLocaleString()}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserMessage;
