"use client";

import { useState } from "react";
import SelectAppointmentDate from "../../_components/SelectAppointmentDate";
import HealthCareProvidersList from "./HealthCareProvidersList";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "../../_actions/getProviders-actions";

export interface HasAppointmentSearch {
  providerId: string;
  date: Date;
}
const FindAppointments = () => {
  const { data: healthcareProviders } = useQuery({
    queryKey: ["healthcareProviders"],
    queryFn: getProviders,
    staleTime: 60 * 1000,
  });
  const [appointmentSearch, setAppointmentSearch] =
    useState<HasAppointmentSearch>({
      providerId: "",
      date: new Date(),
    });
  return (
    <div className="flex flex-col items-center gap-y-3">
      <HealthCareProvidersList
        appointmentSearch={appointmentSearch}
        setAppointmentSearch={setAppointmentSearch}
      />
      <SelectAppointmentDate
        appointmentSearch={appointmentSearch}
        setAppointmentSearch={setAppointmentSearch}
      />
    </div>
  );
};

export default FindAppointments;
