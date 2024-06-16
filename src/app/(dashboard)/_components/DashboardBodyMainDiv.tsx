import React from "react";
interface DashboardBodyMainDivProps {
  children: any;
}
const DashboardBodyMainDiv = ({ children }: DashboardBodyMainDivProps) => {
  return (
    <div className="flex flex-col w-full relative gap-y-5 p-5">{children}</div>
  );
};

export default DashboardBodyMainDiv;
