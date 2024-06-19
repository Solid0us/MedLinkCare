import { Prisma } from "@prisma/client";
import React from "react";
import CheckoutLineItemsTable from "./CheckoutLineItemsTable";
import StripeCheckoutSession from "./StripeCheckoutSession";

interface CheckoutFormProps {
  invoices: Prisma.AppointmentInvoicesGetPayload<{
    include: {
      appointmentInvoiceDetails: {
        include: {
          appointmentReasons: true;
        };
      };
    };
  }>[];
  clientSecret: string;
}

const CheckoutForm = ({ invoices, clientSecret }: CheckoutFormProps) => {
  return (
    <>
      <CheckoutLineItemsTable invoices={invoices} />
      <StripeCheckoutSession clientSecret={clientSecret} />
    </>
  );
};

export default CheckoutForm;
