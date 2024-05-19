import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SessionWrapper from "@/context/SessionWrapper";
import DashboardSideBar from "./_components/DashboardSideBar";

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
          <DashboardSideBar>{children}</DashboardSideBar>
        </SessionWrapper>
      </body>
    </html>
  );
}
