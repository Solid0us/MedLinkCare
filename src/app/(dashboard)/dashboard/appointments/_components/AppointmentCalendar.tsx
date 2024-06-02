"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-fit"
      />
    </>
  );
};

export default AppointmentCalendar;
