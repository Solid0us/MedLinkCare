"use client";
import { Calendar } from "@/components/ui/calendar";
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";

interface AppointmentCalendarProps {
  date: Date | undefined;
  setDate: (val: Date | undefined) => void;
}

const AppointmentCalendar = ({ date, setDate }: AppointmentCalendarProps) => {
  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(e) => setDate(e)}
        className="rounded-md border w-fit"
        disabled={(date) =>
          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
          date < new Date("1900-01-01")
        }
      />
    </>
  );
};

export default AppointmentCalendar;
