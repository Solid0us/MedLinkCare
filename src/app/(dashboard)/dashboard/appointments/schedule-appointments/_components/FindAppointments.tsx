"use client";

import { useState } from "react";
import SelectAppointmentDate from "../../_components/SelectAppointmentDate";
import HealthCareProvidersList from "./HealthCareProvidersList";
import { useQuery } from "@tanstack/react-query";
import { getAvailableAppointments } from "../../_actions/getAvailableAppointments-actions";
import { Appointment, Locations, Users } from "@/interfaces/db_interfaces";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { bookAppointments } from "../../_actions/bookAppointment-actions";
import { Separator } from "@/components/ui/separator";

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

  const bookAppointment = (appointmentId: string) => {
    try {
      bookAppointments(appointmentId, session?.user.id ?? "");
    } catch (err) {
      console.log(err);
      alert("Could not book appointment");
    }
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
      {availableAppointments.length > 0 ? (
        <>
          <Separator className="bg-black" />
          <div className="flex flex-col w-full lg:w-5/6 p-5 border-indigo-600 border-2 rounded-lg items-center justify-center gap-y-3">
            <h1>
              <span className="font-bold text-indigo-500">{`${availableAppointments[0].providers.firstName}
           ${availableAppointments[0].providers.lastName}'s `}</span>
              {`upcoming appointments`}
            </h1>
            {availableAppointments.map((appointment, idx) => {
              return (
                <Card
                  key={appointment.id}
                  className="flex items-center justify-center w-full max-w-4xl border-indigo-300"
                >
                  <CardContent className="flex flex-col items-center w-full gap-3">
                    <p>
                      {appointment.startDate.toLocaleString()} (
                      {
                        appointment.startDate
                          .toLocaleTimeString("en-us", {
                            timeZoneName: "short",
                          })
                          .split(" ")[2]
                      }
                      )
                    </p>
                    <p>{appointment.locations.address}</p>
                    <Button className="bg-indigo-500 hover:bg-indigo-600">
                      Select
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <p>{resultsMessage}</p>
      )}
    </div>
  );
};

export default FindAppointments;
