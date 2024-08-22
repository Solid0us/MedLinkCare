import AnimateCardScaleUp from "@/animations/AnimateCardScaleUp";
import HomeDashboardCardBody from "./HomeDashboardCardBody";
import { CardContent, CardHeader } from "@/components/ui/card";
import getTotalUnreadMessages from "@/app/(dashboard)/_actions/getTotalUnreadMessages-actions";

const InboxNotification = async () => {
  const messages = await getTotalUnreadMessages();

  const getTimeAgo = (date: Date) => {
    const millisecondsAgo = new Date().getTime() - new Date(date).getTime();
    const minutesAgo = millisecondsAgo / 1000 / 60;
    if (minutesAgo < 60) {
      return `${minutesAgo.toFixed(0)} minute(s)`;
    }
    const hoursAgo = minutesAgo / 60;
    if (hoursAgo < 24) {
      return `${hoursAgo.toFixed(0)} hour(s)`;
    }
    const daysAgo = hoursAgo / 24;
    return `${daysAgo.toFixed(0)} day(s)`;
  };
  return (
    <AnimateCardScaleUp>
      <HomeDashboardCardBody>
        <CardHeader className="font-bold">Messages</CardHeader>
        <CardContent>
          {messages.length > 0 ? (
            <>
              <p>
                {messages[0].sender.firstName} {messages[0].sender.lastName}{" "}
                sent a message {getTimeAgo(messages[0].date)} ago.
              </p>
            </>
          ) : (
            <p>You have no unread messages.</p>
          )}
        </CardContent>
      </HomeDashboardCardBody>
    </AnimateCardScaleUp>
  );
};

export default InboxNotification;
