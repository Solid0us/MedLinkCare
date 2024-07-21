"use client";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EmailIcon from "@mui/icons-material/Email";
import PaymentIcon from "@mui/icons-material/Payment";

interface DashboardSideBarItemProps {
  expand: boolean;
  label: string;
  href: string;
  unreadMessages?: any[];
}

const DashboardSideBarItem = ({
  expand,
  label,
  href,
  unreadMessages,
}: DashboardSideBarItemProps) => {
  const determineUnreadEmailRender = () => {
    if (unreadMessages) {
      if (unreadMessages.length > 0) {
        return (
          <div
            className={`${
              expand ? "visible" : "invisible md:visible"
            } float-start -translate-y-2 translate-x-4 h-0 w-0`}
          >
            <p className="bg-rose-300 w-5 h-5 rounded-full text-center flex justify-center items-center">
              {unreadMessages.length}
            </p>
          </div>
        );
      }
    }
  };

  return (
    <Link
      href={href}
      className={`${
        expand ? "w-full" : "w-fit "
      } flex flex-row gap-x-5 hover:bg-white hover:cursor-pointer rounded-lg p-3 duration-200`}
    >
      <button>
        {label === "Main" && (
          <HomeIcon
            className={`${expand ? "visible" : "invisible md:visible"}`}
          />
        )}{" "}
        {label === "Appointments" && (
          <EventNoteIcon
            className={`${expand ? "visible" : "invisible md:visible"}`}
          />
        )}{" "}
        {label === "Inbox" && (
          <>
            <EmailIcon
              className={`${expand ? "visible" : "invisible md:visible"}`}
            />
            {determineUnreadEmailRender()}
          </>
        )}
        {label === "Payments" && (
          <PaymentIcon
            className={`${expand ? "visible" : "invisible md:visible"}`}
          />
        )}
      </button>
      <label
        className={`${
          !expand ? "hidden" : "opacity-100"
        } duration-100 hover:cursor-pointer text-nowrap`}
      >
        {label}
      </label>
    </Link>
  );
};

export default DashboardSideBarItem;
