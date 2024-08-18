import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import SessionWrapper from "@/context/SessionWrapper";
import Link from "next/link";

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
          <Link href="/" className="mt-auto mb-auto text-2xl">
            <h1 className="pl-5 pt-3 bg-gradient-to-r from-violet-900 to-blue-700 text-transparent bg-clip-text ">
              MedLink Care
            </h1>
          </Link>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
