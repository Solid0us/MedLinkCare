import AnimateCardScaleUp from "@/animations/AnimateCardScaleUp";
import React from "react";
import HomeDashboardCardBody from "./HomeDashboardCardBody";
import { CardContent, CardHeader } from "@/components/ui/card";

const BillingCard = () => {
  return (
    <AnimateCardScaleUp>
      <HomeDashboardCardBody>
        <CardHeader className="font-bold">Outstanding Balance</CardHeader>
        <CardContent>Display Total Pending Balance Here</CardContent>
      </HomeDashboardCardBody>
    </AnimateCardScaleUp>
  );
};

export default BillingCard;
