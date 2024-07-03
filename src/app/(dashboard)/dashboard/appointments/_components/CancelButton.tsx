"use client";
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
    <Button
      onClick={() => handleCancelAppointment(appointment.id)}
      className="bg-gray-400 hover:bg-gray-500"
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
