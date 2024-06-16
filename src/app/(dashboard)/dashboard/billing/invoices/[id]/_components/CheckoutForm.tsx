"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";
import CheckoutLineItemsTable from "../../_components/CheckoutLineItemsTable";

interface CheckoutFormProps {
  invoice: Prisma.AppointmentInvoicesGetPayload<{
    include: {
      appointmentInvoiceDetails: {
        include: {
          appointmentReasons: true;
        };
      };
    };
  }>;
  clientSecret: string;
}

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

const CheckoutForm = ({ invoice, clientSecret }: CheckoutFormProps) => {
  return (
    <div className="flex flex-col gap-5">
      <CheckoutLineItemsTable invoices={[invoice]} />
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form id={invoice.id} />
      </Elements>
    </div>
  );
};

const Form = ({ id }: { id: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (stripe && elements) {
      stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/billing/invoices/${id}/success`,
          },
        })
        .then(({ error }) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentElement />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Pay now</Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default CheckoutForm;
