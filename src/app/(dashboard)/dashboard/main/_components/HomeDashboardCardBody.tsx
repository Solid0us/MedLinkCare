import { Card } from "@/components/ui/card";
import React from "react";

interface HomeDashboardCardBodyProps {
  children: any;
}

const HomeDashboardCardBody = ({ children }: HomeDashboardCardBodyProps) => {
  return (
    <Card className="border-2 border-violet-300 min-w-44 max-w-96">
      {children}
    </Card>
  );
};

export default HomeDashboardCardBody;
