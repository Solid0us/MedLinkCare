import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  HasAppointmentSearch,
  HasAppointmentWithLocations,
} from "./FindAppointments";
import Loading from "../loading";
interface AvailableAppointmentResultsProps {
  availableAppointments: HasAppointmentWithLocations[];
  handleSelectAppointment: (appointment: HasAppointmentWithLocations) => any;
  isLoading: boolean;
  appointmentSearch: HasAppointmentSearch;
}
const AvailableAppointmentResults = ({
  availableAppointments,
  handleSelectAppointment,
  isLoading,
  appointmentSearch,
}: AvailableAppointmentResultsProps) => {
  if (isLoading) {
    return <Loading />;
  }
  if (availableAppointments.length > 0) {
    return (
      <div className="flex flex-col w-full lg:w-5/6 p-5 border-indigo-600 border-2 rounded-lg items-center justify-center gap-y-3">
        <h1>
          <span className="font-bold text-indigo-500">{`${availableAppointments?.[0]?.providers.firstName}
           ${availableAppointments?.[0]?.providers.lastName}'s `}</span>
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
                <Button
                  onClick={() => handleSelectAppointment(appointment)}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  } else if (
    availableAppointments.length === 0 &&
    appointmentSearch.providerId
  ) {
    return <p>No Results</p>;
  }
};

export default AvailableAppointmentResults;
