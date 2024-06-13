import React from "react";

const InvoicePaymentSuccessPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="font-bold">Payment Success!</h1>
      <p>
        Your payment for invoice ID {params.id} has been successfully processed!
      </p>
    </div>
  );
};

export default InvoicePaymentSuccessPage;
