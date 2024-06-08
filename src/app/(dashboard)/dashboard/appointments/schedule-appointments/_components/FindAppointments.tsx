"use client";

import { useState } from "react";
import SelectAppointmentDate from "../../_components/SelectAppointmentDate";
import HealthCareProvidersList from "./HealthCareProvidersList";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "../../_actions/getProviders-actions";
import { getAvailableAppointments } from "../../_actions/getAvailableAppointments-actions";
import { Appointment } from "@/interfaces/db_interfaces";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { bookAppointments } from "../../_actions/bookAppointment-actions";

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
  const { data: session } = useSession();

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

  const bookAppointment = (appointmentId: string) => {
    try {
      bookAppointments(appointmentId, session?.user.id ?? "");
    } catch (err) {
      console.log(err);
      alert("Could not book appointment");
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
            <Card key={appointment.id}>
              <CardHeader>{appointment.startDate.toLocaleString()}</CardHeader>
              <CardContent className="flex flex-col items-center">
                <Button onClick={() => bookAppointment(appointment.id)}>
                  Book
                </Button>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <p>{resultsMessage}</p>
      )}
    </div>
  );
};

export default FindAppointments;
