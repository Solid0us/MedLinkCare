import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";
import PageTitle from "../../_components/PageTitle";
import { Button } from "@/components/ui/button";

const Loading = () => {
  return (
    <>
      <div className="invisible">
        <PageTitle title="Appointments" />
      </div>
      <div className="flex flex-col items-center gap-y-10">
        <Link href="/dashboard/appointments/schedule-appointments">
          <Button>Book an appointment</Button>
        </Link>
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

export default Loading;
