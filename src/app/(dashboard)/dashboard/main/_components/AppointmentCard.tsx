import AnimateCardScaleUp from "@/animations/AnimateCardScaleUp";
import React, { Suspense } from "react";
import HomeDashboardCardBody from "./HomeDashboardCardBody";
import { CardContent, CardHeader } from "@/components/ui/card";
import AppointmentList from "./AppointmentList";

const AppointmentCard = () => {
  return (
    <AnimateCardScaleUp>
      <HomeDashboardCardBody>
        <CardHeader className="font-bold">Upcoming Appointments</CardHeader>
        <CardContent>
          <Suspense fallback="loading...">
            <AppointmentList />
          </Suspense>
        </CardContent>
      </HomeDashboardCardBody>
    </AnimateCardScaleUp>
  );
};

export default AppointmentCard;
