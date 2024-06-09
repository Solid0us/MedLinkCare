"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
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
import { bookAppointments } from "../../_actions/bookAppointment-actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import getAppointmentReasons from "../../_actions/getAppointmentReasons-actions";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

interface HasBookAppointmentForm {
  returnToSearch: () => any;
  appointment: HasAppointmentWithLocations;
}

const bookAppointmentFormSchema = z.object({
  appointmentId: z.string(),
  clientsId: z.string(),
  visitReasonId: z.string().min(1),
});

export type BookAppointmentForm = z.infer<typeof bookAppointmentFormSchema>;

const BookAppointmentForm = ({
  returnToSearch,
  appointment,
}: HasBookAppointmentForm) => {
  const { data: session } = useSession();
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<BookAppointmentForm>({
    resolver: zodResolver(bookAppointmentFormSchema),
    mode: "onSubmit",
    defaultValues: {
      appointmentId: appointment.id,
      clientsId: session?.user.id ?? "",
      visitReasonId: "",
    },
  });
  const mutation = useMutation({
    mutationFn: (data: BookAppointmentForm) => {
      return bookAppointments(data);
    },
  });

  const { data: visitReasons } = useQuery({
    queryKey: ["visitReasons"],
    queryFn: getAppointmentReasons,
  });

  const toggleConfirmationModal = () => {
    setIsConfirmation((prevState) => !prevState);
  };

  const handleSubmitForm = async () => {
    mutation.mutate({
      appointmentId: form.getValues("appointmentId"),
      clientsId: form.getValues("clientsId"),
      visitReasonId: form.getValues("visitReasonId"),
    });
  };

  useEffect(() => {
    if (mutation.isPending === false && mutation.isSuccess) {
      setIsSubmitted(true);
      form.reset();
    } else if (mutation.isPending === false && mutation.isError) {
      console.log("error");
    }
  }, [form, mutation.isPending, mutation.isSuccess, mutation.isError]);
  return (
    <div className="flex flex-col items-center">
      <Button
        className="bg-slate-500 hover:bg-slate-600"
        onClick={() => returnToSearch()}
      >
        Return to Search
      </Button>
      <Form {...form}>
        <form
          id="appointmentForm"
          className="p-3 border-2 border-indigo-500 rounded-lg"
          onSubmit={form.handleSubmit(toggleConfirmationModal)}
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
          <FormField
            control={form.control}
            name="appointmentId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className=""
                    type="text"
                    hidden={true}
                    readOnly={true}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clientsId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    className=""
                    type="text"
                    hidden={true}
                    readOnly={true}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visitReasonId"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col lg:flex-row items-center pt-5 pb-5 gap-3">
                  <Label>Reason for Visit</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {visitReasons?.map((data) => (
                        <SelectItem key={data.id} value={data.id}>
                          {data.reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-row justify-center">
            <Button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 p-3 text-white rounded-lg"
            >
              Book
            </Button>
            <Dialog open={isConfirmation} onOpenChange={setIsConfirmation}>
              <DialogContent
                className="w-5/6"
                onInteractOutside={(e) => {
                  e.preventDefault();
                }}
              >
                {isSubmitted ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-violet-400 ">
                        Booking Successful!
                      </DialogTitle>
                      <DialogDescription>
                        You have successfully booked an appointment! Would you
                        like to pay now or later?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full flex flex-row justify-center gap-5">
                      <Link href="/dashboard/appointments">
                        <Button className="bg-slate-500 hover:bg-slate-600">
                          Later
                        </Button>
                      </Link>
                      <Link href="/dashboard/appointments">
                        <Button className="bg-violet-500 hover:bg-violet-600 text-wrap">
                          Pay Now (Stripe Coming Soon!)
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle>Confirm Booking</DialogTitle>
                      <DialogDescription>
                        Please confirm the following information is correct
                        before booking:
                        <br />
                        <br />
                        <span className="font-bold">Healthcare Provider: </span>
                        {appointment.providers.firstName +
                          " " +
                          appointment.providers.lastName}
                        <br />
                        <span className="font-bold">Date: </span>
                        {appointment.startDate.toLocaleString()}
                        <br />
                        <span className="font-bold">Reason for Visit: </span>
                        {
                          visitReasons?.find(
                            (reason) =>
                              reason.id === form.getValues("visitReasonId")
                          )?.reason
                        }
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-row justify-center gap-5">
                      <Button
                        type="button"
                        className="bg-slate-500 hover:bg-slate-600"
                        onClick={toggleConfirmationModal}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="button"
                        form="appointmentForm"
                        onClick={handleSubmitForm}
                      >
                        Confirm
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookAppointmentForm;
