"use client";
import React from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface StripeCheckoutSessionProps {
  clientSecret: string;
}

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

const StripeCheckoutSession = ({
  clientSecret,
}: StripeCheckoutSessionProps) => {
  return (
    <EmbeddedCheckoutProvider options={{ clientSecret }} stripe={stripePromise}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
};

export default StripeCheckoutSession;
