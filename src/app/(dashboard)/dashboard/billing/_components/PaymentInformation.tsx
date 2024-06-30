import React from "react";
import PendingPayments from "./PendingPayments";
import PaymentHistory from "./PaymentHistory";
import { getServerSession } from "next-auth";
import { getOustandingPaymentsActions } from "../invoices/[id]/_actions/getOustandingPayments-actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const PaymentInformation = async () => {
  const session = await getServerSession(authOptions);
  const invoiceBillingDetails = await getOustandingPaymentsActions(
    session?.user.id ?? ""
  );

  return (
    <>
      <PendingPayments invoiceBillingDetails={invoiceBillingDetails} />
      <PaymentHistory invoiceBillingDetails={invoiceBillingDetails} />
    </>
  );
};

export default PaymentInformation;
