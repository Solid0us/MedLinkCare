"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelAppointment } from "../_actions/cancelAppointment-actions";
import { HasAppointmentsAndUsers } from "./AppointmentList";
import { Button } from "@/components/ui/button";

interface CancelButtonProps {
  appointment: HasAppointmentsAndUsers;
}

const CancelButton = ({ appointment }: CancelButtonProps) => {
  const handleCancelAppointment = async (appointmentId: string) => {
    await cancelAppointment(appointmentId);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gray-400 hover:bg-gray-500">
            Cancel Appointment
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to cancel this appointment? You will be
            refunded for any payment made towards this appointment.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" className="bg-slate-500 hover:bg-slate-600">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={() => handleCancelAppointment(appointment.id)}
              className="bg-red-400 hover:bg-red-500"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelButton;
