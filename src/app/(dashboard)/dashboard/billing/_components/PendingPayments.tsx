import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { convertCentsToUSD } from "@/lib/numberUtils";
import { InvoicesWithPaymentsAndDetails } from "../invoice/[id]/_actions/getOustandingPayments-actions";
import { calculateDaysRemaining } from "@/lib/dateUtils";
import Link from "next/link";

interface PendingPaymentsProps {
  invoiceBillingDetails: {
    totalDueInCents: number;
    unpaidInvoices: InvoicesWithPaymentsAndDetails[];
    paidInvoices: InvoicesWithPaymentsAndDetails[];
  };
}
const PendingPayments = ({ invoiceBillingDetails }: PendingPaymentsProps) => {
  const { unpaidInvoices, totalDueInCents } = invoiceBillingDetails;
  const determineDaysRemainingText = (dueDate: Date) => {
    const days = calculateDaysRemaining(new Date(), dueDate);
    if (days >= 0) {
      return `${days} days remaining`;
    } else {
      return "PAYMENT PAST DUE";
    }
  };
  return (
    <Card className="border-2 border-violet-500 p-3">
      <CardHeader>
        <div className="flex flex-col lg:flex-row justify-between gap-y-5">
          <div className="flex flex-col items-start gap-y-1">
            <CardTitle>Pending Payments</CardTitle>
            <p>
              <span className="font-bold">Total Amount Due: </span>
              {convertCentsToUSD(totalDueInCents)}
            </p>
          </div>
          {unpaidInvoices.length > 0 && (
            <Button>Pay All Pending Invoices</Button>
          )}
        </div>
      </CardHeader>
      <Separator className="bg-indigo-500 mb-5" />
      <CardContent className="flex flex-col gap-y-5">
        {unpaidInvoices.length === 0 ? (
          <p>No pending payments</p>
        ) : (
          <>
            {unpaidInvoices.map((invoice) => (
              <>
                {
                  <Card
                    key={invoice.id}
                    className="p-2 border-indigo-300 border-2"
                  >
                    <CardHeader>
                      <CardTitle> Invoice ID: {invoice.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col lg:flex-row justify-between">
                        <div>
                          <p>
                            Invoice Date:{" "}
                            {new Date(invoice.invoiceDate).toLocaleString()}
                          </p>
                          <p>
                            Due Date:{" "}
                            {new Date(invoice.dueDate).toLocaleString()} (
                            {determineDaysRemainingText(invoice.dueDate)})
                          </p>
                        </div>
                        <Link href={`/dashboard/billing/invoice/${invoice.id}`}>
                          <Button>Pay now</Button>
                        </Link>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {invoice.appointmentInvoiceDetails.map((detail) => (
                        <ol key={detail.id} className="list-disc ml-8">
                          <li>
                            {`${
                              detail.appointmentReasons.reason
                            } - ${convertCentsToUSD(
                              detail.appointmentReasons.priceInCents
                            )}`}
                            <p className="text-slate-400 text-sm">
                              {detail.appointmentReasons.description}
                            </p>
                          </li>
                        </ol>
                      ))}
                    </CardFooter>
                  </Card>
                }
              </>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingPayments;
