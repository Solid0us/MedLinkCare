"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { data: session } = useSession();
  if (!session?.user) {
    //  redirect("/auth/login");
  }
  return <div>hi</div>;
};

export default Dashboard;
