"use client";
import { useSession } from "next-auth/react";

const WelcomeMessage = () => {
  const { data: session, status } = useSession();
  console.log(session);
  if (status !== "loading" && session?.user) {
    return (
      <h1>
        Welcome {session.user.firstName} {session.user.lastName}
      </h1>
    );
  }
};

export default WelcomeMessage;
