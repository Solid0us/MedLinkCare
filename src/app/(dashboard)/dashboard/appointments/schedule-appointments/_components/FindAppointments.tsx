"use client";

import { useState } from "react";
import SelectAppointmentDate from "../../_components/SelectAppointmentDate";
import HealthCareProvidersList from "./HealthCareProvidersList";
import { getAvailableAppointments } from "../../_actions/getAvailableAppointments-actions";
import { Appointment, Locations, Users } from "@/interfaces/db_interfaces";
import { Separator } from "@/components/ui/separator";
import AvailableAppointmentResults from "./AvailableAppointmentResults";
import BookAppointmentForm from "./BookAppointmentForm";
import { useQuery } from "@tanstack/react-query";

export interface HasAppointmentSearch {
  providerId: string;
  date: Date;
  providerFirstName: string;
  providerLastName: string;
}

export interface HasAppointmentWithLocations extends Appointment {
  locations: Locations;
  providers: Users;
}
const FindAppointments = () => {
  const [skip, setSkip] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState<
    HasAppointmentWithLocations | undefined
  >();
  const [appointmentSearch, setAppointmentSearch] =
    useState<HasAppointmentSearch>({
      providerId: "",
      date: new Date(),
      providerFirstName: "",
      providerLastName: "",
    });
  const { data: appointmentResults, isFetching: isFetchingAppointmentResults } =
    useQuery({
      queryKey: [
        "appointmentList",
        appointmentSearch.providerId,
        appointmentSearch.date,
      ],
      queryFn: () => getAvailableAppointments(appointmentSearch, skip),
      staleTime: 60 * 1000,
      placeholderData: [],
      enabled: !!appointmentSearch.providerId,
    });

  const handleSelectAppointment = (
    appointment: HasAppointmentWithLocations
  ) => {
    setSelectedAppointment(appointment);
  };

  const handleReturnToAppointmentSearch = () => {
    setSelectedAppointment(undefined);
  };

  return (
    <div className="flex flex-col items-center gap-y-3 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <HealthCareProvidersList
          appointmentSearch={appointmentSearch}
          setAppointmentSearch={setAppointmentSearch}
        />

        <SelectAppointmentDate
          appointmentSearch={appointmentSearch}
          setAppointmentSearch={setAppointmentSearch}
        />
      </div>
      <Separator className="bg-black" />
      {selectedAppointment ? (
        <BookAppointmentForm
          returnToSearch={handleReturnToAppointmentSearch}
          appointment={selectedAppointment}
        />
      ) : (
        <>
          <AvailableAppointmentResults
            appointmentSearch={appointmentSearch}
            availableAppointments={appointmentResults ?? []}
            handleSelectAppointment={handleSelectAppointment}
            isLoading={isFetchingAppointmentResults}
          />
        </>
      )}
    </div>
  );
};

export default FindAppointments;
