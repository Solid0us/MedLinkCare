import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Appointment, Users } from "@/interfaces/db_interfaces";
import { getServerSession } from "next-auth";

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

const AppointmentList = async () => {
  const session = await getServerSession(authOptions);
  const appointments = await getAppointments(session?.user.id ?? "");
  if (appointments.length > 0) {
    return (
      <div className="flex flex-col gap-y-5">
        {appointments.map((appointment) => {
          return (
            <Card key={appointment.id} className="border-2 border-violet-300">
              <CardHeader>
                <p>
                  <span className="font-bold text-violet-700">Date: </span>
                  {new Date(appointment.startDate).toLocaleString()}
                </p>
              </CardHeader>
              <CardContent>
                <div>
                  <p>
                    <span className="font-bold text-violet-700">
                      Healthcare Provider:{" "}
                    </span>
                    {appointment.providers.firstName}{" "}
                    {appointment.providers.lastName}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
};

export default AppointmentList;
