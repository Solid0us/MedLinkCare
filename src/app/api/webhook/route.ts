import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!);
export const POST = async (req: NextRequest, res: NextResponse) => {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.NEXT_STRIPE_WEHOOK_SECRET!
    );
    console.log("event", event.type);
    return NextResponse.json({ status: "success", event: event.type });
  } catch (err) {
    return NextResponse.json({ status: "Failed", err });
  }
};
