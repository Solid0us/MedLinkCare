import WelcomeMessage from "@/app/(dashboard)/_components/WelcomeMessage";
import InboxNotification from "./_components/InboxNotification";
import BillingCard from "./_components/BillingCard";
import AppointmentCard from "./_components/AppointmentCard";

const DashboardMain = () => {
  return (
    <>
      <WelcomeMessage />
      <AppointmentCard />
      <InboxNotification />
      <BillingCard />
    </>
  );
};

export default DashboardMain;
