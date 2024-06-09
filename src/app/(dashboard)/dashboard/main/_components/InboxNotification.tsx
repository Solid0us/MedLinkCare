import AnimateCardScaleUp from "@/animations/AnimateCardScaleUp";
import HomeDashboardCardBody from "./HomeDashboardCardBody";
import { CardContent, CardHeader } from "@/components/ui/card";

const InboxNotification = () => {
  return (
    <AnimateCardScaleUp>
      <HomeDashboardCardBody>
        <CardHeader className="font-bold">Messages</CardHeader>
        <CardContent>Message by ... X Hours ago</CardContent>
      </HomeDashboardCardBody>
    </AnimateCardScaleUp>
  );
};

export default InboxNotification;
