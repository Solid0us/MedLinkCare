"use client";
import { Button } from "@/components/ui/button";
import AppointmentCalendar from "./AppointmentCalendar";
import { Dispatch, SetStateAction, useState } from "react";
import { HasAppointmentSearch } from "../schedule-appointments/_components/FindAppointments";
import { getAvailableAppointments } from "../_actions/getAvailableAppointments-actions";
import { DateRange } from "react-day-picker";

interface SelectAppointmentDateProps {
  appointmentSearch: HasAppointmentSearch;
  setAppointmentSearch: Dispatch<SetStateAction<HasAppointmentSearch>>;
  fetchAvailableAppointments: () => void;
}

const SelectAppointmentDate = ({
  appointmentSearch,
  setAppointmentSearch,
  fetchAvailableAppointments,
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
      return `Search`;
    }
  };
  const determineDisable = () => {
    if (!appointmentSearch.providerId) {
      return true;
    }
    return false;
  };
  return (
    <div className="flex flex-col items-center gap-y-3 rounded-lg shadow-md border-2 border-violet-700 p-5">
      <h3 className="text-violet-700 font-semibold">
        Find Available Appointments
      </h3>
      <AppointmentCalendar date={appointmentSearch.date} setDate={selectDate} />
      <Button
        className={`p-6 ${
          determineDisable() && "opacity-30 pointer-events-none"
        }`}
        onClick={fetchAvailableAppointments}
      >
        {determineButtonText()}
      </Button>
    </div>
  );
};

export default SelectAppointmentDate;
