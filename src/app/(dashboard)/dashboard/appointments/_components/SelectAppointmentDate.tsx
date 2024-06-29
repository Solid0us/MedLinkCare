"use client";
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
    if (date) {
      setAppointmentSearch((prevState) => ({
        ...prevState,
        date,
      }));
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-3 rounded-lg shadow-md border-2 border-violet-700 p-5">
      <h3 className="text-violet-700 font-semibold">Select a Date:</h3>
      <AppointmentCalendar date={appointmentSearch.date} setDate={selectDate} />
    </div>
  );
};

export default SelectAppointmentDate;
