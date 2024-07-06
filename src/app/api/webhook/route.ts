import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!);
export const POST = async (req: NextRequest, res: NextResponse) => {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.NEXT_STRIPE_WEHOOK_SECRET!
    );
    // Create appoint reason when product is created
    if (event.type === "product.created") {
      const { id, description, name } = event.data.object;
      try {
        await prisma.appointmentReasons.upsert({
          where: {
            id,
          },
          create: {
            id,
            reason: name,
            description: description ?? "",
          },
          update: {},
        });
      } catch (err) {
        console.log(err);
      }
    }
    // Update appointment's price when price is created
    if (event.type === "price.created" || event.type === "price.updated") {
      const {
        id,
        product: productId,
        unit_amount: unitAmountInCents,
      } = event.data.object;
      if (unitAmountInCents) {
        try {
          await prisma.appointmentReasons.update({
            where: {
              id: productId as string,
            },
            data: {
              priceInCents: unitAmountInCents,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (event.type === "payment_intent.succeeded") {
      const { amount, metadata, id } = event.data.object;
      if (metadata.invoiceId) {
        await prisma.appointmentPayments.create({
          data: {
            amountPaidInCents: amount,
            appointmentInvoiceId: metadata.invoiceId,
            stripePaymentIntentId: id,
          },
        });
      }
    }
    if (event.type === "checkout.session.completed") {
      const { id, payment_intent } = event.data.object;
      const { data: lineItems } = await stripe.checkout.sessions.listLineItems(
        id
      );
      const invoiceIds = String(event.data.object.metadata?.invoices).split(
        ","
      );
      const queriedInvoices = await prisma.appointmentInvoices.findMany({
        where: {
          id: {
            in: invoiceIds,
          },
        },
        include: {
          appointmentInvoiceDetails: true,
        },
      });
      let appointmentPaymentsPayload: Prisma.AppointmentPaymentsGetPayload<{}>[] =
        [];
      queriedInvoices.forEach((invoice) => {
        const productItem = lineItems.find(
          (item) =>
            item.price?.product ===
            invoice.appointmentInvoiceDetails[0].appointmentReasonsId
        );
        if (productItem) {
          appointmentPaymentsPayload.push({
            appointmentInvoiceId: invoice.id,
            amountPaidInCents: BigInt(productItem.amount_total),
            transactionDate: new Date(),
            id: crypto.randomUUID(),
            stripePaymentIntentId: String(payment_intent),
          });
        }
      });

      await prisma.appointmentPayments.createMany({
        data: appointmentPaymentsPayload,
      });
    }

    if (event.type === "charge.refund.updated") {
      const { amount, id, created, metadata } = event.data.object;
      if (metadata?.appointmentPaymentId) {
        try {
          await prisma.refunds.upsert({
            create: {
              id,
              refundDate: new Date(created),
              appointmentPaymentId: metadata.appointmentPaymentId,
              amountInCents: amount,
            },
            update: {
              refundDate: new Date(created),
              appointmentPaymentId: metadata.appointmentPaymentId,
              amountInCents: amount,
            },
            where: {
              id,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
    }

    return NextResponse.json({ status: "success", event: event.type });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: "Failed", err });
  }
};
