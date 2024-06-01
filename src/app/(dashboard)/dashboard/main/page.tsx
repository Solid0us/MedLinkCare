import WelcomeMessage from "@/app/(home)/_components/WelcomeMessage";
import AppointmentList from "./_components/AppointmentList";
import InboxNotification from "./_components/InboxNotification";
import BillingCard from "./_components/BillingCard";

const DashboardMain = () => {
  return (
    <div className="flex flex-col w-full relative gap-y-5">
      <WelcomeMessage />
      <AppointmentList />
      <InboxNotification />
      <BillingCard />
    </div>
  );
};

export default DashboardMain;
