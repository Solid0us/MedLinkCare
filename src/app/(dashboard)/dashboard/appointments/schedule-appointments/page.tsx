import React from "react";
import SelectAppointmentDate from "../_components/SelectAppointmentDate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import HealthCareProvidersList from "./_components/HealthCareProvidersList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProviders } from "../_actions/getProviders-actions";
const ScheduleAppointmentsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["healthcareProviders"],
    queryFn: getProviders,
    staleTime: 60 * 1000,
  });
  return (
    <>
      <div className="flex flex-col items-center">
        <Link href="/dashboard/appointments">
          <Button className="bg-slate-500 hover:bg-slate-600">
            <ArrowBackTwoToneIcon />
            Appointments
          </Button>
        </Link>
        <SelectAppointmentDate />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HealthCareProvidersList />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default ScheduleAppointmentsPage;
