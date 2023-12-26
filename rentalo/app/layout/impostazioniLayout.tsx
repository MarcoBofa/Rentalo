"use client";
import React, { useContext, useEffect } from "react";
import "../globals.css";
import UserContext from "../context/useContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface ImpostazioniProps {
  children?: React.ReactNode;
}

const ImpostazioniLayout: React.FC<ImpostazioniProps> = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    }
  }, [currentUser, router]);

  const linkClass = (href: string) => {
    const baseStyle =
      "block py-2.5 px-4 rounded text-sm lg:text-base transition duration-200";
    const activeStyle = "bg-gray-300 text-blue-500 font-bold"; // Style for active link
    const hoverStyle = "hover:bg-gray-300 hover:text-blue-500 hover:font-bold"; // Style for hover

    return `${baseStyle} ${pathname === href ? activeStyle : hoverStyle}`;
  };

  let privatoSet = (
    <>
      <div className="flex flex-row pt-[90px]">
        <aside className="w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-black">
          <ul className="space-y-1 text-sm">
            {/* <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 mt-1 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li> */}
            <li>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/password"
                className={linkClass("/Impostazioni/password")}
              >
                Password
              </Link>
            </li>
            <li>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/credenziali"
                className={linkClass("/Impostazioni/credenziali")}
              >
                Credenziali
              </Link>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mt-1 mr-2"></div>
            </li>
          </ul>
        </aside>

        <main className="w-full lg:w-5/6">{children}</main>
      </div>
    </>
  );

  let aziendaSet = (
    <>
      <div className="flex flex-row pt-[90px]">
        <aside className="w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-black">
          <ul className="space-y-1 text-sm">
            {/* <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 mt-1 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li> */}
            <li>
              <div className=" border-t border-gray-400 ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/password"
                className="block py-2.5 px-4 text-sm lg:text-base rounded transition duration-200 hover:bg-gray-300 hover:text-blue-500 hover:font-bold"
              >
                Password
              </Link>
            </li>
            <li>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/credenziali"
                className="block py-2.5 px-4 rounded text-sm lg:text-base transition duration-200 hover:bg-gray-300 hover:text-blue-500 hover:font-bold "
              >
                Credenziali
              </Link>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mt-1 mr-2"></div>
            </li>
          </ul>
        </aside>

        <main className="w-3/4 lg:w-5/6">{children}</main>
      </div>
    </>
  );

  let noleggiatoreSet = (
    <>
      <div className="flex flex-row pt-[90px]">
        <aside className="w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-black">
          <ul className="space-y-1 text-sm">
            {/* <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 mt-1 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li> */}
            <li>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/password"
                className="block py-2.5 px-4 text-sm lg:text-base rounded transition duration-200 hover:bg-gray-300 hover:text-blue-500 hover:font-bold"
              >
                Password
              </Link>
            </li>
            <li>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/credenziali"
                className="block py-2.5 px-4 rounded text-sm lg:text-base transition duration-200 hover:bg-gray-300 hover:text-blue-500 hover:font-bold "
              >
                Credenziali
              </Link>
              <div className=" border-t border-gray-400 ml-1 lg:ml-2 mt-1 mr-2"></div>
            </li>
          </ul>
        </aside>

        <main className="w-3/4 lg:w-5/6">{children}</main>
      </div>
    </>
  );

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 text-5xl py-2">
        Effettua il login per accedere alle impostazioni.
      </div>
    );
  }
  switch (currentUser.role) {
    case "privato":
      return privatoSet;
    case "azienda":
      return aziendaSet;
    case "noleggiatore":
      return noleggiatoreSet;
    default:
      return aziendaSet;
  }
};

export default ImpostazioniLayout;

// // pages/impostazioni.tsx
// "use client";
// import React, { useContext } from "react";
// import "../globals.css";
// import getUser from "../actions/getUser";
// import { safeUser } from "@/types";
// import AziendaSettings from "@/app/pages/settings/aziendaSettings";
// import PrivatoSettings from "@/app/pages/settings/privatoSettings";
// import NoleggiatoreSettings from "@/app/pages/settings/noleggiatoreSettings";
// import UserContext from "../context/useContext";

// const Impostazioni: React.FC = () => {
//   const { currentUser } = useContext(UserContext);
//   console.log("IMPOSTAzIOnii", currentUser);
//   let SettingsComponent;

//   //   if (currentUser) {
//   //     switch (currentUser.role) {
//   //       case "privato":
//   //         SettingsComponent = PrivatoSettings;
//   //         break;
//   //       case "azienda":
//   //         SettingsComponent = AziendaSettings;
//   //         break;
//   //       case "noleggiatore":
//   //         SettingsComponent = NoleggiatoreSettings;
//   //         break;
//   //       default:
//   //         SettingsComponent = AziendaSettings; // Default to AziendaSettings
//   //         break;
//   //     }
//   //   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       ciao
//     </div>
//   );
// };

// export default Impostazioni;
