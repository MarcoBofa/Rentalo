import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Final Project - Marco Bonafini",
  description: "Stock Competition",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
