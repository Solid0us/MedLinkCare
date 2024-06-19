import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { InvoicesWithPaymentsAndDetails } from "../invoices/[id]/_actions/getOustandingPayments-actions";
import { sortByDate } from "@/lib/sortingUtils";
import { convertCentsToUSD } from "@/lib/numberUtils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PaymentHistoryProps {
  invoiceBillingDetails: {
    totalDueInCents: number;
    unpaidInvoices: InvoicesWithPaymentsAndDetails[];
    paidInvoices: InvoicesWithPaymentsAndDetails[];
  };
}

const PaymentHistory = ({ invoiceBillingDetails }: PaymentHistoryProps) => {
  const { paidInvoices } = invoiceBillingDetails;
  const tableHeaders = ["Invoice ID", "Payment Date", "Amount Paid", "Details"];
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="paymentHistory"
        className="border border-violet-300 p-3 rounded-lg"
      >
        <AccordionTrigger>View Payment History</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableCaption>Payment History</TableCaption>
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paidInvoices
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
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>
                        {new Date(
                          invoice.appointmentPayments[0].transactionDate
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {convertCentsToUSD(
                          invoice.appointmentInvoiceDetails[0].lineTotalInCents
                        )}
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger className="p-3 bg-gray-500 text-white rounded-lg">
                            Open
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="p-2">
                              {invoice.appointmentInvoiceDetails.map(
                                (detail) => (
                                  <ol key={detail.id}>
                                    <li>
                                      {`${detail.appointmentReasons.reason}`}
                                      <p className="text-slate-400 text-sm">
                                        {detail.appointmentReasons.description}
                                      </p>
                                    </li>
                                  </ol>
                                )
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentHistory;
