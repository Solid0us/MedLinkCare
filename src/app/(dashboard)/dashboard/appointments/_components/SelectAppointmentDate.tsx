"use client";
import { Button } from "@/components/ui/button";
import AppointmentCalendar from "./AppointmentCalendar";
import { Dispatch, SetStateAction, useState } from "react";
import { HasAppointmentSearch } from "../schedule-appointments/_components/FindAppointments";

interface SelectAppointmentDateProps {
  appointmentSearch: HasAppointmentSearch;
  setAppointmentSearch: Dispatch<SetStateAction<HasAppointmentSearch>>;
}

const SelectAppointmentDate = ({
  appointmentSearch,
  setAppointmentSearch,
}: SelectAppointmentDateProps) => {
  const selectDate = (date: Date | undefined) => {
    console.log(date);
    if (date) {
      setAppointmentSearch((prevState) => ({
        ...prevState,
        date,
      }));
    }
  };

  const determineButtonText = () => {
    if (!appointmentSearch.providerId) {
      return "Please select a provider";
    } else {
      return `Search (${new Date(
        appointmentSearch.date
      ).toLocaleDateString()})`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-3 rounded-lg shadow-md border-2 border-violet-700 p-5">
      <h3 className="text-violet-700 font-semibold">
        Find Available Appointments
      </h3>
      <AppointmentCalendar date={appointmentSearch.date} setDate={selectDate} />
      <Button
        className={`p-6 ${
          !appointmentSearch.providerId && "opacity-30 pointer-events-none"
        }`}
        onClick={() => console.log(appointmentSearch)}
      >
        {determineButtonText()}
      </Button>
    </div>
  );
};

export default SelectAppointmentDate;
