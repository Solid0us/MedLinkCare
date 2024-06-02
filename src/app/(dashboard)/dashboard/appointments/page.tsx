import { Suspense } from "react";
import AppointmentList from "./_components/AppointmentList";
import PageTitle from "../../_components/PageTitle";
import SelectAppointmentDate from "./_components/SelectAppointmentDate";

const DashboardAppointments = () => {
  return (
    <>
      <div className="flex flex-col w-full relative gap-y-5 p-5">
        <PageTitle title="Appointments" />
        <div className="flex flex-col-reverse md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-center">
              Upcoming Appointments
            </h3>
            <Suspense fallback="Loading...">
              <AppointmentList />
            </Suspense>
          </div>

          <SelectAppointmentDate />
        </div>
      </div>
    </>
  );
};

export default DashboardAppointments;
