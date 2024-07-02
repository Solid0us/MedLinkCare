import PageTitle from "@/app/(dashboard)/_components/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AppointmentListLoading = () => {
  return (
    <>
      <div className="invisible">
        <PageTitle title="Appointments" />
      </div>
      <div className="flex flex-col items-center gap-y-10">
        <div className="flex flex-col gap-5">
          <Skeleton className="items-center h-56 w-80 border" />
          <Skeleton className="items-center h-56 w-80 border" />
          <Skeleton className="items-center h-56 w-80 border" />
          <Skeleton className="items-center h-56 w-80 border" />
        </div>
      </div>
    </>
  );
};

export default AppointmentListLoading;
