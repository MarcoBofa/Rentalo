// // pages/impostazioni.tsx
// import "../globals.css";
// import getUser from "../actions/getUser";
// import { safeUser } from "@/types";
// import Link from "next/link";

// interface ImpostazioniProps {
//   children?: React.ReactNode;
// }

// const ImpostazioniLayout: React.FC<ImpostazioniProps> = async ({
//   children,
// }) => {
//   const currentUser = await getUser();

// pages/impostazioni.tsx
"use client";
import React, { useContext } from "react";
import "../globals.css";
import UserContext from "../context/useContext";
import Link from "next/link";

interface ImpostazioniProps {
  children?: React.ReactNode;
}

const ImpostazioniLayout: React.FC<ImpostazioniProps> = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  let privatoSet = (
    <>
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
    </>
  );

  let aziendaSet = (
    <>
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
    </>
  );

  let noleggiatoreSet = (
    <>
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
