import WelcomeMessage from "@/app/(home)/_components/WelcomeMessage";
import AppointmentList from "./_components/AppointmentList";
import InboxNotification from "./_components/InboxNotification";

const DashboardMain = () => {
  return (
    <div className="flex flex-col w-full relative gap-y-5">
      <WelcomeMessage />
      <AppointmentList />
      <InboxNotification />
    </div>
  );
};

export default DashboardMain;
