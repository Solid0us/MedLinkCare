import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { convertCentsToUSD } from "@/lib/numberUtils";
import { Prisma } from "@prisma/client";
import React from "react";
interface CheckoutLineItemsTableProps {
  invoices: Prisma.AppointmentInvoicesGetPayload<{
    include: {
      appointmentInvoiceDetails: {
        include: {
          appointmentReasons: true;
        };
      };
    };
  }>[];
}
const CheckoutLineItemsTable = ({ invoices }: CheckoutLineItemsTableProps) => {
  const headers = ["Invoice ID", "Invoice Date", "Cost", "Details"];
  return (
    <Table className="border border-violet-600">
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header} className="font-bold text-black">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>
              {new Date(invoice.invoiceDate).toLocaleString()}
            </TableCell>
            <TableCell>
              {convertCentsToUSD(
                invoice.appointmentInvoiceDetails[0].lineTotalInCents
              )}
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-3">
                {invoice.appointmentInvoiceDetails.map((detail) => (
                  <div key={detail.id} className=" text-left">
                    <p>{detail.appointmentReasons.reason}</p>
                    <p className="text-slate-400">
                      {detail.appointmentReasons.description}
                    </p>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CheckoutLineItemsTable;
