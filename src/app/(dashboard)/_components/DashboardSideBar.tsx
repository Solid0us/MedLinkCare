"use client";

import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";

interface DashboardSideBarProps {
  children: any;
}

const DashboardSideBar = ({ children }: DashboardSideBarProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <div
        className={`pl-5 pt-2 pr-5 flex flex-col fixed left-0 top-0 items-start h-full gap-y-3 bg-violet-300 border-r-2 border-violet-500 overflow-hidden ${
          expand ? "w-80" : "w-20"
        }  max-w-96 duration-500 `}
      >
        <div className="flex flex-row gap-x-10">
          <h1
            className={`bg-gradient-to-r from-violet-900 to-blue-700 text-transparent bg-clip-text text-nowrap ${
              !expand && "hidden"
            } `}
          >
            MedLink Care
          </h1>

          <button
            className="right-0 text-white bg-purple-800 hover:bg-purple-700 rounded-full duration-200"
            onClick={() => setExpand((prevState) => !prevState)}
          >
            <KeyboardArrowRightIcon
              className={`${expand ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
        <div className="w-full flex flex-row gap-x-5 hover:bg-white hover:cursor-pointer rounded-lg p-3 duration-200">
          <button>
            <HomeIcon />
          </button>
          <label
            className={`${
              !expand ? "hidden" : "opacity-100"
            } duration-100 hover:cursor-pointer text-nowrap`}
          >
            Main
          </label>
        </div>
        <div className="w-full flex flex-row gap-x-5 hover:bg-white hover:cursor-pointer rounded-lg p-3 duration-200">
          <button>
            <EventNoteIcon />
          </button>
          <label
            className={`${
              !expand ? "hidden" : "opacity-100"
            } duration-100 hover:cursor-pointer text-nowrap`}
          >
            Appointments
          </label>
        </div>
      </div>
      <div className={`${expand ? "ml-80" : "ml-20"} duration-500 p-4 `}>
        {children}
      </div>
    </>
  );
};

export default DashboardSideBar;
