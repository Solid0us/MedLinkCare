import Stripe from "stripe";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!);
const seedAppointmentReasons = async () => {
  const activeProductList = (
    await stripe.products.list({ expand: ["data.default_price"] })
  ).data;
  let appointmentReasons: Prisma.AppointmentReasonsGetPayload<{}>[] = [];
  for (let i = 0; i < activeProductList.length; i++) {
    if (activeProductList[i].active) {
      const defaultPrice = activeProductList[i].default_price as Stripe.Price;
      appointmentReasons.push({
        id: activeProductList[i].id,
        reason: activeProductList[i].name,
        description: activeProductList[i].description ?? "",
        priceInCents: defaultPrice.unit_amount
          ? BigInt(defaultPrice.unit_amount)
          : BigInt(0),
      });
    }
  }
  const reasons = await prisma.appointmentReasons.createMany({
    data: appointmentReasons,
    skipDuplicates: true,
  });
};

export default seedAppointmentReasons;
