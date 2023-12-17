import React, { ReactNode } from "react";
import "./globals.css";
import { Inter, Nunito } from "next/font/google";
import ToasterProvider from "@/providers/ToasterProvider";
import Footer from "@/app/components/footer";
import NavbarPrivato from "@/app/components/NavbarPrivato";
import Navbar from "@/app/components/Navbar";
import NavbarNoleggiatore from "@/app/components/NavbarNoleggiatore";
import NavbarAzienda from "@/app/components/NavbarAzienda";
import getUser from "./actions/getUser";
import { UserProvider } from "./context/useContext"; // Adjust the path

const inter = Inter({ subsets: ["latin"] });
const font = Nunito({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentUser = await getUser();

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
    <UserProvider value={{ currentUser: currentUser }}>
      <html lang="en">
        <body className={font.className}>
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
