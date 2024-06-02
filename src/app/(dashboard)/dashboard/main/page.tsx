import WelcomeMessage from "@/app/(dashboard)/_components/WelcomeMessage";
import InboxNotification from "./_components/InboxNotification";
import BillingCard from "./_components/BillingCard";
import { Suspense } from "react";
import AppointmentCard from "./_components/AppointmentCard";

const DashboardMain = () => {
  return (
    <div className="flex flex-col w-full relative gap-y-5">
      <WelcomeMessage />
      <AppointmentCard />
      <InboxNotification />
      <BillingCard />
    </div>
  );
};

export default DashboardMain;
