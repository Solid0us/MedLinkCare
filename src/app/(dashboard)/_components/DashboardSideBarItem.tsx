import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EmailIcon from "@mui/icons-material/Email";

interface DashboardSideBarItemProps {
  expand: boolean;
  label: string;
  href: string;
}

const DashboardSideBarItem = ({
  expand,
  label,
  href,
}: DashboardSideBarItemProps) => {
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
          <EmailIcon
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
