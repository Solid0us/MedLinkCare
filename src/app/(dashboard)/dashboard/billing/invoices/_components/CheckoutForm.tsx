import React from "react";
import StripeCheckoutSession from "./StripeCheckoutSession";
import Stripe from "stripe";
import { getOustandingPaymentsActions } from "../[id]/_actions/getOustandingPayments-actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const stripe = new Stripe(`${process.env.NEXT_STRIPE_SECRET_KEY}`, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const CheckoutForm = async () => {
  const session = await getServerSession(authOptions);
  const invoicesWithDetails = await getOustandingPaymentsActions(
    session?.user.id ?? ""
  );
  if (!invoicesWithDetails) {
    return <p>Invoices do not exist.</p>;
  }

  const stripeSession = await stripe.checkout.sessions.create({
    customer_email: session?.user.email ?? undefined,
    ui_mode: "embedded",
    payment_method_types: ["card"],
    metadata: {
      invoices: invoicesWithDetails.unpaidInvoices
        .map((invoice) => invoice.id)
        .join(","),
    },
    line_items: invoicesWithDetails.unpaidInvoices.map((invoice) => ({
      price_data: {
        product: invoice.appointmentInvoiceDetails[0].appointmentReasonsId,
        currency: "usd",
        unit_amount: Number(
          invoice.appointmentInvoiceDetails[0].lineTotalInCents
        ),
      },
      quantity: invoice.appointmentInvoiceDetails[0].quantity,
    })),
    mode: "payment",
    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/billing`,
  });
  return (
    <>
      <StripeCheckoutSession clientSecret={stripeSession.client_secret ?? ""} />
    </>
  );
};

export default CheckoutForm;
