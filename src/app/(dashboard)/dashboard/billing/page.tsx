import React from "react";
import { getOustandingPaymentsActions } from "./invoice/[id]/_actions/getOustandingPayments-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const BillingPage = async () => {
  const session = await getServerSession(authOptions);
  getOustandingPaymentsActions(session?.user.id ?? "");
  return <div>BillingPage</div>;
};

export default BillingPage;
