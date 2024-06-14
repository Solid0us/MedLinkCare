import { prisma } from "@/db/prisma";
import CheckoutForm from "./_components/CheckoutForm";
import Stripe from "stripe";
const stripe = new Stripe(`${process.env.NEXT_STRIPE_SECRET_KEY}`, {
  typescript: true,
  apiVersion: "2024-04-10",
});
const AppointmentIdPage = async ({ params }: { params: { id: string } }) => {
  const invoice = await prisma.appointmentInvoices.findUnique({
    where: {
      id: params.id,
    },
    include: {
      appointmentInvoiceDetails: true,
    },
  });
  if (!invoice) {
    return <div>Invoice Not Found</div>;
  }
  const total = invoice.appointmentInvoiceDetails
    .map((item) => item.lineTotalInCents)
    .reduce((partialSum, a) => partialSum + Number(a), 0);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "USD",
    metadata: { invoiceId: invoice.id },
  });
  return (
    <CheckoutForm
      invoice={invoice}
      clientSecret={paymentIntent.client_secret as string}
    />
  );
};

export default AppointmentIdPage;
