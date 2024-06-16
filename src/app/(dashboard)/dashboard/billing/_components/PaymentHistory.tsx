import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { InvoicesWithPaymentsAndDetails } from "../invoice/[id]/_actions/getOustandingPayments-actions";
import { sortByDate } from "@/lib/sortingUtils";
import { convertCentsToUSD } from "@/lib/numberUtils";

interface PaymentHistoryProps {
  invoiceBillingDetails: {
    totalDueInCents: number;
    unpaidInvoices: InvoicesWithPaymentsAndDetails[];
    paidInvoices: InvoicesWithPaymentsAndDetails[];
  };
}

const PaymentHistory = ({ invoiceBillingDetails }: PaymentHistoryProps) => {
  const { paidInvoices } = invoiceBillingDetails;
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="paymentHistory"
        className="border border-violet-300 p-3 rounded-lg"
      >
        <AccordionTrigger>View Payment History</AccordionTrigger>
        <AccordionContent>
          {paidInvoices
            .filter((invoice) => invoice.appointmentPayments.length > 0)
            .sort(
              (a, b) =>
                a.appointmentPayments &&
                b.appointmentPayments &&
                sortByDate(
                  a.appointmentPayments[0].transactionDate,
                  b.appointmentPayments[0].transactionDate
                )
            )
            .map((invoice) => (
              <>
                {
                  <div className="p-2">
                    <h1 className="font-bold text-lg">
                      Invoice ID: {invoice.id}
                    </h1>
                    {new Date(invoice.invoiceDate).toLocaleString()}
                    <p>
                      Payment Date:{" "}
                      {new Date(
                        invoice.appointmentPayments[0].transactionDate
                      ).toLocaleString()}
                    </p>
                    {invoice.appointmentInvoiceDetails.map((detail) => (
                      <ol className="list-disc ml-10">
                        <li>
                          {`${
                            detail.appointmentReasons.reason
                          } - ${convertCentsToUSD(
                            detail.appointmentReasons.priceInCents
                          )}`}
                          <p className="text-slate-400 text-sm">
                            Description: {detail.appointmentReasons.description}
                          </p>
                        </li>
                      </ol>
                    ))}
                  </div>
                }
              </>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentHistory;
