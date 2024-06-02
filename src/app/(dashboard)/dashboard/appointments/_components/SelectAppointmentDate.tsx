"use client";
import { Button } from "@/components/ui/button";
import AppointmentCalendar from "./AppointmentCalendar";
import { useState } from "react";

const SelectAppointmentDate = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const selectDate = (date: Date | undefined) => {
    console.log(date);
    if (date) {
      setDate(date);
    }
  };
  return (
    <div className="flex flex-col items-center gap-y-3 rounded-lg shadow-md border-2 border-violet-700 p-5">
      <h3 className="text-violet-700 font-semibold">
        Find Available Appointments
      </h3>
      <AppointmentCalendar date={date} setDate={selectDate} />
      <Button className="p-6">
        Find Appointments <br />
        {date && `(${new Date(date).toLocaleDateString()})`}
      </Button>
    </div>
  );
};

export default SelectAppointmentDate;
