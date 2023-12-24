"use client";
import React, { useContext, useEffect } from "react";
import "../globals.css";
import UserContext from "../context/useContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ImpostazioniProps {
  children?: React.ReactNode;
}

const ImpostazioniLayout: React.FC<ImpostazioniProps> = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    }
  }, [currentUser, router]);

  let privatoSet = (
    <>
      <div className="flex flex-row pt-[90px]">
        <aside className="w-1/5 min-h-screen top-21 left-0 bg-gray-800 text-white">
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 mt-1 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li>
            <li>
              <div className=" border-t border-gray-400 ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/password"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Password
              </Link>
            </li>
            <li>
              <div className=" border-t border-gray-400 ml-2 mb-1 mr-2"></div>
              <Link
                href="/Impostazioni/credenziali"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700  "
              >
                Credenziali
              </Link>
              <div className=" border-t border-gray-400 ml-2 mt-1 mr-2"></div>
            </li>
          </ul>
        </aside>

        <main className="w-4/5">{children}</main>
      </div>
    </>
  );

  let aziendaSet = (
    <>
      <div className="flex flex-row  pt-[90px]">
        <aside className="w-1/5 min-h-screen top-21 left-0 bg-gray-800 text-white">
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li>
            <li>
              <Link
                href="/Impostazioni/password"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Password
              </Link>
            </li>
            <li>
              <Link
                href="/Impostazioni/piva"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                P.IVA
              </Link>
            </li>
            <li>
              <Link
                href="/Impostazioni/nome"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Nome
              </Link>
            </li>
            <li>
              <Link
                href="/Impostazioni/nome"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Cognome
              </Link>
            </li>
          </ul>
        </aside>
        <main className="w-4/5">{children}</main>
      </div>
    </>
  );

  let noleggiatoreSet = (
    <>
      <div className="flex flex-row pt-[90px]">
        <aside className="w-1/5 min-h-screen top-21 left-0 bg-gray-800 text-white">
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li>
            <li>
              <Link
                href="/Impostazioni/password"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Password
              </Link>
            </li>
            <li>
              <Link
                href="/Impostazioni/nome"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Nome
              </Link>
            </li>
            <li>
              <Link
                href="/Impostazioni/nome"
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Cognome
              </Link>
            </li>
          </ul>
        </aside>
        <main className="w-4/5">{children}</main>
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
