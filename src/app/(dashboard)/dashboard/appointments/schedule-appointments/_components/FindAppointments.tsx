"use client";

import { useState } from "react";
import SelectAppointmentDate from "../../_components/SelectAppointmentDate";
import HealthCareProvidersList from "./HealthCareProvidersList";
import { useQuery } from "@tanstack/react-query";
import { getAvailableAppointments } from "../../_actions/getAvailableAppointments-actions";
import { Appointment, Locations, Users } from "@/interfaces/db_interfaces";
import { useSession } from "next-auth/react";
import { bookAppointments } from "../../_actions/bookAppointment-actions";
import { Separator } from "@/components/ui/separator";
import AvailableAppointmentResults from "./AvailableAppointmentResults";
import BookAppointmentForm from "./BookAppointmentForm";

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
  const { data: session } = useSession();

  const [skip, setSkip] = useState(0);
  const [availableAppointments, setAvailableAppointments] = useState<
    HasAppointmentWithLocations[]
  >([]);
  const [selectedAppointment, setSelectedAppointment] = useState<
    HasAppointmentWithLocations | undefined
  >();
  const [resultsMessage, setResultsMessage] = useState("");
  const [appointmentSearch, setAppointmentSearch] =
    useState<HasAppointmentSearch>({
      providerId: "",
      date: new Date(),
      providerFirstName: "",
      providerLastName: "",
    });

  const fetchAvailableAppointments = async () => {
    const appointments = await getAvailableAppointments(
      appointmentSearch,
      skip
    );
    setAvailableAppointments(appointments);
    if (appointments.length === 0) {
      setResultsMessage("No appointments were found.");
    }
  };

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
          fetchAvailableAppointments={fetchAvailableAppointments}
        />
      </div>
      <Separator className="bg-black" />
      {selectedAppointment ? (
        <BookAppointmentForm
          returnToSearch={handleReturnToAppointmentSearch}
          appointment={selectedAppointment}
        />
      ) : (
        <AvailableAppointmentResults
          availableAppointments={availableAppointments}
          resultsMessage={resultsMessage}
          handleSelectAppointment={handleSelectAppointment}
        />
      )}
    </div>
  );
};

export default FindAppointments;
