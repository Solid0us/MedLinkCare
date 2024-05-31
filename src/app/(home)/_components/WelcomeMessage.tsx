import AnimateTitleLeftToRight from "@/animations/AnimateTitleLeftToRight";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const WelcomeMessage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <AnimateTitleLeftToRight>
      Welcome {session?.user.firstName} {session?.user.lastName}
    </AnimateTitleLeftToRight>
  );
};

export default WelcomeMessage;
