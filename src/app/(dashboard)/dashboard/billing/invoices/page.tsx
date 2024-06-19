import React from "react";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import CheckoutLineItemsTable, {
  addAllInvoiceLineItems,
} from "./_components/CheckoutLineItemsTable";
import { getOustandingPaymentsActions } from "./[id]/_actions/getOustandingPayments-actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CheckoutForm from "./_components/CheckoutForm";

const stripe = new Stripe(`${process.env.NEXT_STRIPE_SECRET_KEY}`, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const InvoicesPage = async () => {
  const session = await getServerSession(authOptions);
  const invoicesWithDetails = await getOustandingPaymentsActions(
    session?.user.id ?? ""
  );
  if (!invoicesWithDetails) {
    return <p>Invoices do not exist.</p>;
  }
  // TODO: Need to implement product/price ID matching of database
  const stripeSession = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          product: "prod_QGL3IJVSzdCPi2",
          currency: "usd",
          unit_amount: 2500,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });
  return (
    <CheckoutForm
      clientSecret={stripeSession.client_secret as string}
      invoices={invoicesWithDetails.unpaidInvoices}
    />
  );
};

export default InvoicesPage;
