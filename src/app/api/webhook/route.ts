import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/db/prisma";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!);
export const POST = async (req: NextRequest, res: NextResponse) => {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleDateString();
  console.log(
    (
      await stripe.products.list({ expand: ["data.default_price"] })
    ).data.filter((product) => product.active === true)
  );
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
      const { amount, metadata } = event.data.object;
      if (metadata.invoiceId) {
        await prisma.appointmentPayments.create({
          data: {
            amountPaidInCents: amount,
            appointmentInvoiceId: metadata.invoiceId,
          },
        });
      }
    }
    return NextResponse.json({ status: "success", event: event.type });
  } catch (err) {
    return NextResponse.json({ status: "Failed", err });
  }
};
