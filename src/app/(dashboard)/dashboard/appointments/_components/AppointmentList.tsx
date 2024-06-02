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
      <>
        {appointments.map((appointment) => {
          return (
            <Card>
              <CardHeader>
                {new Date(appointment.startDate).toLocaleString()}
              </CardHeader>
              <CardContent>
                <div></div>
              </CardContent>
            </Card>
          );
        })}
      </>
    );
  } else {
    return <></>;
  }
};

export default AppointmentList;
