import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Appointment, Users } from "@/interfaces/db_interfaces";
import { getServerSession } from "next-auth";
import InfoIcon from "@mui/icons-material/Info";
import CancelButton from "./CancelButton";
import getUserAppointments from "../_actions/getUserAppointments-actions";

export interface HasAppointmentsAndUsers extends Appointment {
  providers: Users;
}

const AppointmentList = async () => {
  const session = await getServerSession(authOptions);
  const appointments = await getUserAppointments();

  if (appointments.length > 0) {
    return (
      <div className="flex flex-col gap-y-5">
        <h3 className="font-bold text-lg text-center">Upcoming Appointments</h3>
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
                  <p>
                    <span className="font-bold text-violet-700">
                      Appointment Reason:{" "}
                    </span>
                    {appointment.appointmentReasons?.reason}
                  </p>
                  <p>
                    <span className="font-bold text-violet-700">
                      Location:{" "}
                    </span>
                    {appointment.locations.address}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3 p-2">
                  <CancelButton appointment={appointment} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  } else {
    return (
      <>
        <Card className="border-violet-300">
          <CardHeader className="flex flex-row items-center gap-3">
            <InfoIcon className="text-blue-500" fontSize="large" />
            No Upcoming Appointments
          </CardHeader>
        </Card>
      </>
    );
  }
};

export default AppointmentList;
