import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import {
  Appointment,
  AppointmentReasons,
  Users,
} from "@/interfaces/db_interfaces";

interface HasAppointmentsAndUsers extends Appointment {
  providers: Users;
  appointmentReasons: AppointmentReasons;
}

const getAppointments = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/api/appointments?clientId=${id}&providers=true&start-date-order=asc`
  );
  const data: HasAppointmentsAndUsers[] = (await res.json()).data;
  return data;
};

const UpcomingAppointment = async () => {
  const session = await getServerSession(authOptions);
  const appointments = await getAppointments(session?.user.id ?? "");

  return (
    <>
      {appointments.length > 0 ? (
        <>
          <div className="flex flex-col gap-y-5">
            <p>
              Your next appointment is scheduled with
              <span className="font-bold">
                {` ${appointments[0].providers.firstName} ${appointments[0].providers.lastName}`}
              </span>
            </p>
            <div className="p-3 border border-indigo-200 rounded-lg flex flex-col gap-y-5">
              <p>
                <b>Start Date: </b>
                {new Date(appointments[0].startDate).toLocaleString()}
              </p>
              <p>
                <b>End Date: </b>{" "}
                {new Date(appointments[0].endDate).toLocaleString()}
              </p>
              <p>
                <b>Reason: </b> {appointments[0].appointmentReasons.reason}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>No upcoming appointments.</p>
          <Link href="/dashboard/appointments">
            <span className="text-indigo-600 underline hover:text-indigo-500 font-bold">
              <br />
              Get Care Now!
            </span>
          </Link>
        </>
      )}
    </>
  );
};

export default UpcomingAppointment;
