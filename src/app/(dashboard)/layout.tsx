import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SessionWrapper from "@/context/SessionWrapper";
import DashboardSideBar from "./_components/DashboardSideBar";
import QueryProvider from "@/context/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardBodyMainDiv from "./_components/DashboardBodyMainDiv";
import getTotalUnreadMessages from "./_actions/getTotalUnreadMessages-actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medlink Care - Dashboard",
  description: "Uninsured for Health Care",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const unreadMessages = await getTotalUnreadMessages();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <QueryProvider>
            <DashboardSideBar unreadMessages={unreadMessages}>
              <DashboardBodyMainDiv>{children}</DashboardBodyMainDiv>
            </DashboardSideBar>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
