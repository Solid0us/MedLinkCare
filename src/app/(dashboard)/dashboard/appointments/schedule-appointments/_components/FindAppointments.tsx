"use client";

import { useState } from "react";
import SelectAppointmentDate from "../../_components/SelectAppointmentDate";
import HealthCareProvidersList from "./HealthCareProvidersList";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "../../_actions/getProviders-actions";
import { getAvailableAppointments } from "../../_actions/getAvailableAppointments-actions";
import { Appointment } from "@/interfaces/db_interfaces";

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

  const [skip, setSkip] = useState(0);
  const [availableAppointments, setAvailableAppointments] = useState<
    Appointment[]
  >([]);
  const [resultsMessage, setResultsMessage] = useState("");
  const [appointmentSearch, setAppointmentSearch] =
    useState<HasAppointmentSearch>({
      providerId: "",
      date: new Date(),
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
  return (
    <div className="flex flex-col items-center gap-y-3">
      <HealthCareProvidersList
        appointmentSearch={appointmentSearch}
        setAppointmentSearch={setAppointmentSearch}
      />
      <SelectAppointmentDate
        appointmentSearch={appointmentSearch}
        setAppointmentSearch={setAppointmentSearch}
        fetchAvailableAppointments={fetchAvailableAppointments}
      />
      {availableAppointments.length > 0 ? (
        availableAppointments.map((appointment) => {
          return (
            <div key={appointment.id}>
              {appointment.startDate.toLocaleString()}
            </div>
          );
        })
      ) : (
        <p>{resultsMessage}</p>
      )}
    </div>
  );
};

export default FindAppointments;
