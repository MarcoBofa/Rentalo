import React, { ReactNode } from "react";
import "./globals.css";
import { Inter, Nunito, Roboto_Condensed } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import Footer from "@/app/components/homepage/footer";
import NavbarPrivato from "@/app/components/homepage/NavbarPrivato";
import Navbar from "@/app/components/homepage/Navbar";
import NavbarNoleggiatore from "@/app/components/homepage/NavbarNoleggiatore";
import NavbarAzienda from "@/app/components/homepage/NavbarAzienda";
import getUser from "./actions/getUser";
import { UserProvider } from "./context/useContext"; // Adjust the path
import Head from "next/head";
import type { Metadata } from "next";
import getUserAccount from "./actions/getUserAccount";

const inter = Inter({ subsets: ["latin"] });
const font = Nunito({ subsets: ["latin"] });
const homeFont = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rentalo",
  description: "Noleggio macchinari da cantiere",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentUser = await getUser();
  const userAccount = await getUserAccount();

  let NavbarComponent;
  if (!currentUser) {
    NavbarComponent = Navbar;
  } else {
    switch (currentUser.role) {
      case "privato":
        NavbarComponent = NavbarPrivato;
        break;
      case "azienda":
        NavbarComponent = NavbarAzienda;
        break;
      case "noleggiatore":
        NavbarComponent = NavbarNoleggiatore;
        break;
      default:
        NavbarComponent = Navbar;
    }
  }

  return (
    <UserProvider
      value={{
        currentUser: currentUser,
        userAccount: userAccount ? userAccount : null,
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Rentalo</title>
      </Head>
      <html lang="en">
        <body className={`${font.className} bg-nav`}>
          <ToasterProvider />
          {NavbarComponent && <NavbarComponent />}
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </UserProvider>
  );
}
