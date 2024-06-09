import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SessionWrapper from "@/context/SessionWrapper";
import DashboardSideBar from "./_components/DashboardSideBar";
import QueryProvider from "@/context/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medlink Care - Dashboard",
  description: "Uninsured for Health Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <QueryProvider>
            <DashboardSideBar>{children}</DashboardSideBar>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
