import WelcomeMessage from "@/app/(home)/_components/WelcomeMessage";
import AppointmentList from "./_components/AppointmentList";

const DashboardMain = () => {
  return (
    <div className="w-full relative z-0">
      <WelcomeMessage />
      <AppointmentList />
    </div>
  );
};

export default DashboardMain;
