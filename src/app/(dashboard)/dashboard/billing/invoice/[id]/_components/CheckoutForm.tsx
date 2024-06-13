"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AppointmentInvoiceDetails,
  AppointmentInvoices,
} from "@/interfaces/db_interfaces";
import { convertCentsToUSD } from "@/lib/numberUtils";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";

interface AppointmentInvoicesWithDetails extends AppointmentInvoices {
  appointmentInvoiceDetails: AppointmentInvoiceDetails[];
}

interface CheckoutFormProps {
  invoice: AppointmentInvoicesWithDetails;
  clientSecret: string;
}

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

const CheckoutForm = ({ invoice, clientSecret }: CheckoutFormProps) => {
  return (
    <div>
      <div className="flex flex-col gap-3 p-3 border rounded-lg">
        <h1>
          <span className="font-bold">Invoice ID: </span>
          {invoice.id}
        </h1>
        <p>Invoice Date: {invoice.invoiceDate.toLocaleString()}</p>
        <div>
          <h1>Line Items</h1>
          <ul>
            {invoice.appointmentInvoiceDetails.map((item) => {
              return (
                <li key={item.id}>
                  {convertCentsToUSD(item.lineTotalInCents)}{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
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
            return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/billing/invoice/${id}/success`,
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
