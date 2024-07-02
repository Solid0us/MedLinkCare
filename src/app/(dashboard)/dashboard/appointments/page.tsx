import AppointmentList from "./_components/AppointmentList";
import PageTitle from "../../_components/PageTitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import AppointmentListLoading from "./_components/AppointmentListLoading";

const DashboardAppointments = () => {
  return (
    <>
      <PageTitle title="Appointments" />
      <div className="flex flex-col items-center gap-y-10">
        <Link href="/dashboard/appointments/schedule-appointments">
          <Button>Book an appointment</Button>
        </Link>
        <div className="flex flex-col">
          <Suspense fallback={<AppointmentListLoading />}>
            <AppointmentList />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default DashboardAppointments;
