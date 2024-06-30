import { Suspense } from "react";
import CheckoutForm from "./_components/CheckoutForm";
import ContentLoadingSpinner from "@/animations/ContentLoadingSpinner";
const AppointmentIdPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<ContentLoadingSpinner text="Loading Payment" />}>
      <CheckoutForm params={params} />
    </Suspense>
  );
};

export default AppointmentIdPage;
