import { prisma } from "@/db/prisma";
import React from "react";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
const stripe = new Stripe(`${process.env.NEXT_STRIPE_SECRET_KEY}`, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const InvoicesPage = async () => {
  const session = await getServerSession();
  const invoices = await prisma.appointmentInvoices.findMany({
    where: {
      usersId: session?.user.id ?? "",
    },
    include: {
      appointmentInvoiceDetails: {
        include: {
          appointmentReasons: true,
        },
      },
    },
  });
  if (!invoices) {
    return <p>Invoices do not exist.</p>;
  }
  return <div>InvoicesPage</div>;
};

export default InvoicesPage;
