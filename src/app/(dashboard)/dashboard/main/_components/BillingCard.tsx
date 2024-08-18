import AnimateCardScaleUp from "@/animations/AnimateCardScaleUp";
import React from "react";
import HomeDashboardCardBody from "./HomeDashboardCardBody";
import { CardContent, CardHeader } from "@/components/ui/card";
import { getOustandingPaymentsActions } from "../../billing/invoices/[id]/_actions/getOustandingPayments-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const BillingCard = async () => {
  const session = await getServerSession(authOptions);
  const invoiceBillingDetails = await getOustandingPaymentsActions(
    session?.user.id ?? ""
  );
  return (
    <AnimateCardScaleUp>
      <HomeDashboardCardBody>
        <CardHeader className="font-bold">Outstanding Balance</CardHeader>
        <CardContent>
          <p>
            {invoiceBillingDetails.totalDueInCents > 0
              ? `You have a total balance of $${(
                  invoiceBillingDetails.totalDueInCents / 100
                ).toFixed(2)}.`
              : "You do not have any outstanding balance."}
          </p>
        </CardContent>
      </HomeDashboardCardBody>
    </AnimateCardScaleUp>
  );
};

export default BillingCard;
