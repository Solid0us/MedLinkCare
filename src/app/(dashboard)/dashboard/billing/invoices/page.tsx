import React, { Suspense } from "react";
import CheckoutForm from "./_components/CheckoutForm";
import ContentLoadingSpinner from "@/animations/ContentLoadingSpinner";

const InvoicesPage = () => {
  return (
    <>
      <Suspense fallback={<ContentLoadingSpinner text="Payment Loading" />}>
        <CheckoutForm />
      </Suspense>
    </>
  );
};

export default InvoicesPage;
