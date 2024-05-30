import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth"
type Appointment = {
    id: string;
    clientsId: string;
    providersId: string;
    startDate: Date;
    endDate: Date
    providers: {
        firstName: string;
        lastName: string;
        email: string;
    }
}

const getAppointments = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/appointments?clientId=${id}&providers=true`)
    const data: Appointment[] = (await res.json()).data
    return data
}

const AppointmentList =  async() => {
    const session = await getServerSession(authOptions)
    const appointments = await getAppointments(session?.user.id ?? "")
   if (appointments.length > 0){
       return (
               <>
               {
                   appointments.map((appointment, idx) => {
                       return (
                           <>
                           <p>Appointment {idx + 1}</p>
                           <ul className="list-disc p-3">
                           <li>{new Date(appointment.startDate).toLocaleString()}</li>
                           <li>{new Date(appointment.endDate).toLocaleString()}</li>
                           <li>{appointment.providers.firstName} {appointment.providers.lastName}</li>
                           </ul>
                           </>
                       )
                   })
               } 
               </>
          
       )
   } else {
    return <>
        <h1>No appointments</h1>
    </>
   }
}

export default AppointmentList