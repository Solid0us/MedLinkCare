import { Suspense } from "react";
import AppointmentCalendar from "./_components/AppointmentCalendar";
import AppointmentList from "./_components/AppointmentList";
import HealthcareProviderList from "./_components/HealthcareProviderList";

const DashboardAppointments = () => {
  return (
    <>
      <div>AppointmentsPage</div>
      <Suspense fallback="Loading...">
        <AppointmentList />
      </Suspense>
      <AppointmentCalendar />
      <HealthcareProviderList />
    </>
  );
};

export default DashboardAppointments;
