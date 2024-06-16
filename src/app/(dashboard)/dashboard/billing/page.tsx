import React from "react";
import { getOustandingPaymentsActions } from "./invoice/[id]/_actions/getOustandingPayments-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AnimateTitleLeftToRight from "@/animations/AnimateTitleLeftToRight";
import PendingPayments from "./_components/PendingPayments";
import PaymentHistory from "./_components/PaymentHistory";

const BillingPage = async () => {
  const session = await getServerSession(authOptions);
  const invoiceBillingDetails = await getOustandingPaymentsActions(
    session?.user.id ?? ""
  );

  return (
    <>
      <AnimateTitleLeftToRight>Billing</AnimateTitleLeftToRight>
      <PendingPayments invoiceBillingDetails={invoiceBillingDetails} />
      <PaymentHistory invoiceBillingDetails={invoiceBillingDetails} />
    </>
  );
};

export default BillingPage;
