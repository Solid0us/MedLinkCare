"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.NEXT_STRIPE_SECRET_KEY}`, {
  typescript: true,
  apiVersion: "2024-04-10",
});

export const cancelAppointment = async (appointmentId: string) => {
  const session = await getServerSession(authOptions);
  if (session) {
    const invoice = await prisma.appointmentInvoices.findFirst({
      where: {
        appointmentInvoiceDetails: {
          some: {
            appointmentId,
          },
        },
        active: true,
      },
      include: {
        appointmentInvoiceDetails: true,
        appointmentPayments: true,
      },
    });
    if (invoice) {
      if (invoice.appointmentPayments.length > 0) {
        try {
          console.log(invoice.appointmentPayments);
          await stripe.refunds.create({
            payment_intent:
              invoice.appointmentPayments[0].stripePaymentIntentId,
            amount: Number(invoice.appointmentPayments[0].amountPaidInCents),
            metadata: {
              appointmentPaymentId: invoice.appointmentPayments[0].id,
            },
          });
        } catch (err) {
          console.log(err);
          throw new Error("Unable to refund appointment.");
        }
      }
      await prisma.$transaction([
        prisma.appointmentInvoices.update({
          where: {
            id: invoice.id,
          },
          data: {
            active: false,
          },
        }),
        prisma.appointments.update({
          where: {
            clientsId: session.user.id,
            id: appointmentId,
          },
          data: {
            clientsId: null,
          },
        }),
      ]);
    }
    revalidatePath("/dashboard/appointments");
  } else {
    throw new Error("Unauthenticated");
  }
};
