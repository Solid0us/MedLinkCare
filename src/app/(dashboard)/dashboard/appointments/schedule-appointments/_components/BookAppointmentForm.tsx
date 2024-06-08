"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { HasAppointmentWithLocations } from "./FindAppointments";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { bookAppointments } from "../../_actions/bookAppointment-actions";
import { useQuery } from "@tanstack/react-query";
import getAppointmentReasons from "../../_actions/getAppointmentReasons-actions";
import { useSession } from "next-auth/react";

interface HasBookAppointmentForm {
  returnToSearch: () => any;
  appointment: HasAppointmentWithLocations;
}

const BookAppointmentForm = ({
  returnToSearch,
  appointment,
}: HasBookAppointmentForm) => {
  const { data: session } = useSession();
  const [formState, formAction] = useFormState(bookAppointments, {
    fieldValues: {
      appointmentId: "",
      clientsId: "",
      visitReasonId: "",
    },
    errors: undefined,
    message: "",
  });
  const { data: visitReasons } = useQuery({
    queryKey: ["visitReasons"],
    queryFn: getAppointmentReasons,
    placeholderData: [],
  });
  return (
    <div className="flex flex-col items-center">
      <Button
        className="bg-slate-500 hover:bg-slate-600"
        onClick={() => returnToSearch()}
      >
        Return to Search
      </Button>
      <form
        className="p-3 border-2 border-indigo-500 rounded-lg"
        action={formAction}
      >
        <div className="flex flex-col items-left gap-3 pt-5 pb-5">
          <h1 className="text-center font-bold text-xl underline">
            Book Appointment
          </h1>
          <p>
            <span className="font-bold">Healthcare Provider: </span>
            {appointment.providers.firstName} {appointment.providers.lastName}
          </p>
          <p>
            <span className="font-bold">Date: </span>{" "}
            {new Date(appointment.startDate).toLocaleString()}
          </p>
        </div>
        <Separator className="bg-indigo-500" />
        <input
          className=""
          type="text"
          name="appointmentId"
          hidden={true}
          value={appointment.id}
        />
        <input
          className=""
          type="text"
          name="clientsId"
          hidden={true}
          value={session?.user.id}
        />
        <div className="flex flex-col lg:flex-row items-center pt-5 pb-5">
          <Label>Reason for Visit</Label>
          <Select name="visitReasonId">
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {visitReasons?.map((data) => (
                <SelectItem key={data.id} value={data.id}>
                  {data.reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-row justify-center">
          <Button className="" type="submit">
            Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointmentForm;
