"use client";
import { useParams } from "next/navigation";

const AppointmentDetail = () => {
  const params = useParams();
  const { appointmentId } = params;
  return <div>Appointment {appointmentId}</div>;
};

export default AppointmentDetail;
