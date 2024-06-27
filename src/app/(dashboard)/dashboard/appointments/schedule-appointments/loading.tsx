import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        <Skeleton className="w-56 h-96 flex flex-col items-center  gap-3 border-2 p-3 rounded-lg border-violet-300" />
        <Skeleton className="w-56 h-96 flex flex-col items-center  gap-3 border-2 p-3 rounded-lg border-violet-300" />
      </div>
    </div>
  );
};

export default Loading;
