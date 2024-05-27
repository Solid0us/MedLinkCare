import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import TopNavBar from "@/components/TopNavBar";
import AttributionsFooter from "@/components/AttributionsFooter";
import SessionWrapper from "@/context/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medlink Care",
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
          <TopNavBar />
          {children}
          <AttributionsFooter />
        </SessionWrapper>
      </body>
    </html>
  );
}
