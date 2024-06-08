import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProviders } from "../_actions/getProviders-actions";
import FindAppointments from "./_components/FindAppointments";
const ScheduleAppointmentsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["healthcareProviders"],
    queryFn: getProviders,
    staleTime: 60 * 1000,
  });
  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <Link href="/dashboard/appointments">
          <Button className="bg-slate-500 hover:bg-slate-600">
            <ArrowBackTwoToneIcon />
            Appointments
          </Button>
        </Link>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FindAppointments />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default ScheduleAppointmentsPage;
