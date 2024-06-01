import AnimateTitleLeftToRight from "@/animations/AnimateTitleLeftToRight";
import DetermineTimeOfDayGreeting from "@/app/(dashboard)/dashboard/main/_components/DetermineTimeOfDayGreeting";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const WelcomeMessage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <AnimateTitleLeftToRight>
      <DetermineTimeOfDayGreeting
        name={`${session?.user.firstName} ${session?.user.lastName}`}
      />
    </AnimateTitleLeftToRight>
  );
};

export default WelcomeMessage;
