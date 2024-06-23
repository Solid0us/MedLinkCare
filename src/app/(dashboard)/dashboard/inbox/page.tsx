import React from "react";
import getMessages from "./_actions/getMessages-actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import InboxView from "./_components/InboxView";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import getHealthcareProviders from "./_actions/getHealthcareProviders-actions";

export interface HasInbox {
  [key: string]: {
    name: string;
    messages: Prisma.MessagesGetPayload<{
      include: { receiver: true; sender: true };
    }>[];
  };
}

const groupMessagesIntoInboxes = (
  messages: Prisma.MessagesGetPayload<{
    include: { receiver: true; sender: true };
  }>[],
  userId: string
) => {
  let inboxHash: HasInbox = {};
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].senderId === userId) {
      if (inboxHash[messages[i].receiverId]) {
        inboxHash[messages[i].receiverId].messages.push(messages[i]);
      } else {
        Object.assign(inboxHash, {
          [messages[i].receiverId]: {
            name: `${
              messages[i].receiver.firstName +
              " " +
              messages[i].receiver.lastName
            }`,
            messages: [messages[i]],
          },
        });
      }
    } else if (messages[i].receiverId === userId) {
      if (inboxHash[messages[i].senderId]) {
        inboxHash[messages[i].senderId].messages.push(messages[i]);
      } else {
        Object.assign(inboxHash, {
          [messages[i].senderId]: {
            name: `${
              messages[i].sender.firstName + " " + messages[i].sender.lastName
            }`,
            messages: [messages[i]],
          },
        });
      }
    }
  }
  return inboxHash;
};

const InboxPage = async () => {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["newConvoHealthcareProviders"],
    queryFn: getHealthcareProviders,
    staleTime: 60 * 1000,
  });
  if (session?.user.id) {
    const messages = await getMessages(session.user.id);
    const inbox = groupMessagesIntoInboxes(messages, session.user.id);
    return (
      <>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <InboxView inbox={inbox} />
        </HydrationBoundary>
      </>
    );
  }
};

export default InboxPage;
