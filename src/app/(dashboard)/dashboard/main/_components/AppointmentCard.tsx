import AnimateCardScaleUp from "@/animations/AnimateCardScaleUp";
import React, { Suspense } from "react";
import HomeDashboardCardBody from "./HomeDashboardCardBody";
import { CardContent, CardHeader } from "@/components/ui/card";
import UpcomingAppointment from "./UpcomingAppointment";

const AppointmentCard = () => {
  return (
    <AnimateCardScaleUp>
      <HomeDashboardCardBody>
        <CardHeader className="font-bold">Appointments</CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <UpcomingAppointment />
          </Suspense>
        </CardContent>
      </HomeDashboardCardBody>
    </AnimateCardScaleUp>
  );
};

export default AppointmentCard;
