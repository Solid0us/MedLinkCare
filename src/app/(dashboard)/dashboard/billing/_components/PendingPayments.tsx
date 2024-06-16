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

interface PendingPaymentsProps {
  invoiceBillingDetails: {
    totalDueInCents: number;
    unpaidInvoices: InvoicesWithPaymentsAndDetails[];
    paidInvoices: InvoicesWithPaymentsAndDetails[];
  };
}
const PendingPayments = ({ invoiceBillingDetails }: PendingPaymentsProps) => {
  const { unpaidInvoices, totalDueInCents } = invoiceBillingDetails;
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
          <Button>Pay All Pending Invoices</Button>
        </div>
      </CardHeader>
      <Separator className="bg-indigo-500 mb-5" />
      <CardContent className="flex flex-col gap-y-5">
        {unpaidInvoices
          .filter((invoice) => invoice.appointmentPayments.length === 0)
          .map((invoice) => (
            <>
              {
                <Card className="p-2 border-indigo-300 border-2">
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
                          Due Date: {new Date(invoice.dueDate).toLocaleString()}
                        </p>
                      </div>
                      <Button>Pay now</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {invoice.appointmentInvoiceDetails.map((detail) => (
                      <ol className="list-disc ml-8">
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
                  </CardFooter>
                </Card>
              }
            </>
          ))}
      </CardContent>
    </Card>
  );
};

export default PendingPayments;
