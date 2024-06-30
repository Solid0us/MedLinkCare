import React, { Suspense } from "react";
import AnimateTitleLeftToRight from "@/animations/AnimateTitleLeftToRight";
import PaymentInformation from "./_components/PaymentInformation";
import ContentLoadingSpinner from "@/animations/ContentLoadingSpinner";

const BillingPage = () => {
  return (
    <>
      <AnimateTitleLeftToRight>Billing</AnimateTitleLeftToRight>
      <Suspense fallback={<ContentLoadingSpinner text="Loading Balance" />}>
        <PaymentInformation />
      </Suspense>
    </>
  );
};

export default BillingPage;
