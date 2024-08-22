"use client";

import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DashboardLogoutButton from "./DashboardLogoutButton";
import DashboardSideBarItem from "./DashboardSideBarItem";
import MenuIcon from "@mui/icons-material/Menu";

interface DashboardSideBarProps {
  children: any;
  unreadMessages: any[];
}

const DashboardSideBar = ({
  children,
  unreadMessages,
}: DashboardSideBarProps) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div
        className="md:invisible fixed z-50 top-0 left-0 m-4 hover:bg-violet-200 rounded-lg bg-purple-100"
        onClick={() => setExpand((prevState) => !prevState)}
      >
        <MenuIcon fontSize="large" className=" text-violet-600 " />
      </div>
      <div
        className={`md:pl-5 pt-2 md:pr-5 flex flex-col fixed left-0 top-0 items-start h-full gap-y-3 bg-violet-300 border-r-2 border-violet-500 overflow-hidden ${
          expand ? "visible w-2/3 md:w-80" : "invisible md:visible w-0 md:w-20"
        }  max-w-96 duration-500 z-50`}
      >
        <div className="flex flex-row z-50 gap-x-5 p-3">
          <button
            className="visible right-0  text-white bg-purple-800 hover:bg-purple-700 rounded-full duration-200"
            onClick={() => setExpand((prevState) => !prevState)}
          >
            <KeyboardArrowRightIcon
              className={`${expand ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <h1
            className={`bg-gradient-to-r from-violet-900 to-blue-700 text-transparent bg-clip-text text-nowrap ${
              !expand && "hidden"
            } `}
          >
            MedLink Care
          </h1>
        </div>
        <DashboardSideBarItem
          href="/dashboard/main"
          label="Main"
          expand={expand}
        />
        <DashboardSideBarItem
          href="/dashboard/appointments"
          label="Appointments"
          expand={expand}
        />
        <DashboardSideBarItem
          href="/dashboard/inbox"
          label="Inbox"
          expand={expand}
          unreadMessages={unreadMessages}
        />
        <DashboardSideBarItem
          href="/dashboard/billing"
          label="Payments"
          expand={expand}
        />
        <DashboardLogoutButton expand={expand} />
      </div>
      <div
        className={`${
          expand ? "ml-0 md:ml-80" : "ml-0 md:ml-20"
        } duration-500 pl-4 pr-4 pt-14 `}
      >
        {children}
      </div>
    </>
  );
};

export default DashboardSideBar;
