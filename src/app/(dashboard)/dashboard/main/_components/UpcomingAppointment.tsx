import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Appointment, Users } from "@/interfaces/db_interfaces";

interface HasAppointmentsAndUsers extends Appointment {
  providers: Users;
}

const getAppointments = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_BASE_URL}/api/appointments?clientId=${id}&providers=true`
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
          <p>Next Appointment:</p>
          <ul className="list-disc p-3">
            <li>
              Start: {new Date(appointments[0].startDate).toLocaleString()}
            </li>
            <li>End: {new Date(appointments[0].endDate).toLocaleString()}</li>
            <li>
              {appointments[0].providers.firstName}{" "}
              {appointments[0].providers.lastName}
            </li>
          </ul>
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
