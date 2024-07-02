import StripeCheckoutSession from "../../_components/StripeCheckoutSession";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/db/prisma";

const stripe = new Stripe(`${process.env.NEXT_STRIPE_SECRET_KEY}`, {
  typescript: true,
  apiVersion: "2024-04-10",
});

const CheckoutForm = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const invoice = await prisma.appointmentInvoices.findUnique({
    where: {
      id: params.id,
    },
    include: {
      appointmentInvoiceDetails: {
        include: {
          appointmentReasons: true,
        },
      },
    },
  });
  if (!invoice) {
    return <div>Invoice Not Found</div>;
  }
  const stripeSession = await stripe.checkout.sessions.create({
    customer_email: session?.user.email ?? undefined,
    ui_mode: "embedded",
    payment_method_types: ["card"],
    metadata: {
      invoices: invoice.id,
    },
    line_items: [
      {
        price_data: {
          product: invoice.appointmentInvoiceDetails[0].appointmentReasonsId,
          currency: "usd",
          unit_amount: Number(
            invoice.appointmentInvoiceDetails[0].lineTotalInCents
          ),
        },
        quantity: invoice.appointmentInvoiceDetails[0].quantity,
      },
    ],
    mode: "payment",
    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/billing/invoices/${params.id}/success`,
  });
  return (
    <div className="flex flex-col gap-5">
      <StripeCheckoutSession clientSecret={stripeSession.client_secret ?? ""} />
    </div>
  );
};

export default CheckoutForm;
