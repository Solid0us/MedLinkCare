import AnimateCardScaleUp from "@/animations/AnimateCardScaleUp";
import HomeDashboardCardBody from "./HomeDashboardCardBody";
import { CardContent, CardHeader } from "@/components/ui/card";

const InboxNotification = () => {
  return (
    <AnimateCardScaleUp>
      <HomeDashboardCardBody>
        <CardHeader className="font-bold">Notifications</CardHeader>
        <CardContent>Messages</CardContent>
      </HomeDashboardCardBody>
    </AnimateCardScaleUp>
  );
};

export default InboxNotification;
