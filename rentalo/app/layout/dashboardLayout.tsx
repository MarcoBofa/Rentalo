"use client";
import React, { useContext, useEffect } from "react";
import "../globals.css";
import UserContext from "../context/useContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaLock } from "react-icons/fa"; // Example: FontAwesome lock icon
import { GiMineTruck } from "react-icons/gi";
import { GiTowTruck } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md"; // Example: Material Design account circle icon
import { ClimbingBoxLoader } from "react-spinners";
import { MdBorderColor } from "react-icons/md";
import { MdBurstMode } from "react-icons/md";

interface DashboardProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    }
  }, [currentUser, router]);

  const linkClass = (href: string) => {
    // const baseStyle =
    // "flex flex-row items-center block py-2.5 px-4 lg:px-8 rounded text-sm lg:text-base transition duration-200";
    const baseStyle =
      "p-3 xs:pl-1 lg:p-[15px] mb-2 flex flex-row space-x-1 lg:space-x-[10px] rounded text-xs lg:text-base transition duration-200";
    const inactiveStyle = "text-textSettings1"; // Custom color for inactive link
    const activeStyle = "bg-gray-200 text-blue-500 font-semibold"; // Style for active link
    const hoverStyle =
      "hover:bg-gray-200 hover:text-blue-500 hover:font-semibold"; // Style for hover

    return `${baseStyle} ${
      pathname?.includes(href) ? activeStyle : `${inactiveStyle} ${hoverStyle}`
    }`;
  };

  const subLinkClass = (href: string) => {
    // const baseStyle =
    // "flex flex-row items-center block py-2.5 px-4 lg:px-8 rounded text-sm lg:text-base transition duration-200";
    const baseStyle =
      "p-[5px] lg:p-[15px] ml-4 lg:ml-6 flex flex-row space-x-[5px] rounded text-xxs mb-1 lg:text-sm transition duration-200";
    const inactiveStyle = "text-textSettings1"; // Custom color for inactive link
    const activeStyle = "underline text-blue-500"; // Style for active link
    const hoverStyle = "hover:underline hover:text-blue-500"; // Style for hover

    return `${baseStyle} ${
      pathname === href ? activeStyle : `${inactiveStyle} ${hoverStyle}`
    }`;
  };

  let privatoSet = (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col pt-[90px] w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-textSettings1 mt-[30px] space-y-[40px] lg:space-y-[100px]">
          <aside className="px-1 lg:px-[20px] flex flex-col ">
            <span className="font-semibold pl-[8px] lg:pl-[15px] mb-[15px] xs:text-center lg:mb-[20px]">
              DASHBOARD
            </span>
            <Link
              href="/dashboard/macchinari-noleggiati"
              className={linkClass("/dashboard/macchinari-noleggiati")}
            >
              <div>
                <GiTowTruck className="lg:mr-[4px] mt-[-2px] lg:mt-[-3px] text-lg lg:text-2.5xl" />
              </div>
              <div>Macchinari noleggiati</div>
            </Link>
            <Link
              href="/dashboard/analytics"
              className={linkClass("/dashboard/analytics")}
            >
              <div>
                <MdAnalytics className="lg:mr-[4px] mt-[-2px] lg:mt-[-2px] text-lg lg:text-2.5xl" />
              </div>
              <div>Analytics</div>
            </Link>
          </aside>
          <aside className="px-1 lg:px-[20px] flex flex-col">
            <span className="font-semibold pl-[8px] lg:pl-[15px] mb-[15px] xs:text-center lg:mb-[20px]">
              ACCOUNT
            </span>
            <Link
              href="/dashboard/password"
              className={linkClass("/dashboard/password")}
            >
              <div>
                <FaLock className="lg:mr-[4px] mt-[-1px] lg:mt-[1px] text-sm lg:text-xl" />
              </div>
              <div>Password</div>
            </Link>
            <Link
              href="/dashboard/credenziali"
              className={linkClass("/dashboard/credenziali")}
            >
              <div>
                <FaUserAlt className="lg:mr-[4px] mt-[-1px] lg:mt-[1px] text-sm lg:text-xl" />
              </div>
              <div>Credenziali</div>
            </Link>
          </aside>
        </div>
        <main className="w-full lg:w-5/6">{children}</main>
      </div>
    </>
  );

  let aziendaSet = (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col pt-[90px] w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-textSettings1 mt-[30px] space-y-[40px] lg:space-y-[100px]">
          <aside className="px-1 lg:px-[20px] flex flex-col">
            <span className="font-semibold pl-[8px] lg:pl-[15px] mb-[15px] xs:text-center lg:mb-[20px]">
              DASHBOARD
            </span>
            <Link
              href="/dashboard/parco-macchine"
              className={linkClass("/dashboard/parco-macchine")}
            >
              <div>
                <GiMineTruck className="lg:mr-[4px] mt-[-1px] lg:mt-[-2px] text-base lg:text-2.5xl" />
              </div>
              <div>La mia flotta</div>
            </Link>
            <Link
              href="/dashboard/parco-macchine/aggiungi"
              className={subLinkClass("/dashboard/parco-macchine/aggiungi")}
            >
              <div>
                <MdBorderColor className="mr-[1px] lg:mr-[4px] mt-[2px] lg:mt-[1px] text-xs lg:text-base" />
              </div>
              <div> Aggiungi Macchinario</div>
            </Link>
            <Link
              href="/dashboard/parco-macchine/gestisci"
              className={subLinkClass("/dashboard/parco-macchine/gestisci")}
            >
              <div>
                <MdBurstMode className="mr-[1px] lg:mr-[4px] mt-[1px] lg:mt-[-1px] text-sm lg:text-xl" />
              </div>
              <div> Gestisci parco macchine</div>
            </Link>
            <Link
              href="/dashboard/macchinari-noleggiati"
              className={linkClass("/dashboard/macchinari-noleggiati")}
            >
              <div>
                <GiTowTruck className="lg:mr-[4px] mt-[-2px] lg:mt-[-3px] text-lg lg:text-2.5xl" />
              </div>
              <div>Macchinari noleggiati</div>
            </Link>
            <Link
              href="/dashboard/analytics"
              className={linkClass("/dashboard/analytics")}
            >
              <div>
                <MdAnalytics className="lg:mr-[4px] mt-[-2px] lg:mt-[-2px] text-lg lg:text-2.5xl" />
              </div>
              <div>Analytics</div>
            </Link>
          </aside>
          <aside className="px-1 lg:px-[20px] flex flex-col">
            <span className="font-semibold pl-[8px] lg:pl-[15px] mb-[15px] xs:text-center lg:mb-[20px]">
              ACCOUNT
            </span>
            <Link
              href="/dashboard/password"
              className={linkClass("/dashboard/password")}
            >
              <div>
                <FaLock className="lg:mr-[4px] mt-[-1px] lg:mt-[1px] text-sm lg:text-xl" />
              </div>
              <div>Password</div>
            </Link>
            <Link
              href="/dashboard/credenziali"
              className={linkClass("/dashboard/credenziali")}
            >
              <div>
                <FaUserAlt className="lg:mr-[4px] mt-[-1px] lg:mt-[1px] text-sm lg:text-xl" />
              </div>
              <div>Credenziali</div>
            </Link>
          </aside>
        </div>
        <main className="w-full lg:w-5/6">{children}</main>
      </div>
    </>
  );

  let noleggiatoreSet = (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col pt-[90px] w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-textSettings1 mt-[30px] space-y-[40px] lg:space-y-[100px]">
          <aside className="px-1 lg:px-[20px] flex flex-col">
            <span className="font-semibold pl-[8px] lg:pl-[15px] mb-[15px] xs:text-center lg:mb-[20px]">
              DASHBOARD
            </span>
            <Link
              href="/dashboard/macchinari-noleggiati"
              className={linkClass("/dashboard/macchinari-noleggiati")}
            >
              <div>
                <GiTowTruck className="lg:mr-[4px] mt-[-2px] lg:mt-[-3px] text-lg lg:text-2.5xl" />
              </div>
              <div>Macchinari noleggiati</div>
            </Link>
            <Link
              href="/dashboard/analytics"
              className={linkClass("/dashboard/analytics")}
            >
              <div>
                <MdAnalytics className="lg:mr-[4px] mt-[-2px] lg:mt-[-2px] text-lg lg:text-2.5xl" />
              </div>
              <div>Analytics</div>
            </Link>
          </aside>
          <aside className="px-1 lg:px-[20px] flex flex-col">
            <span className="font-semibold pl-[8px] lg:pl-[15px] mb-[15px] xs:text-center lg:mb-[20px]">
              ACCOUNT
            </span>
            <Link
              href="/dashboard/password"
              className={linkClass("/dashboard/password")}
            >
              <div>
                <FaLock className="lg:mr-[4px] mt-[-1px] lg:mt-[1px] text-sm lg:text-xl" />
              </div>
              <div>Password</div>
            </Link>
            <Link
              href="/dashboard/credenziali"
              className={linkClass("/dashboard/credenziali")}
            >
              <div>
                <FaUserAlt className="lg:mr-[4px] mt-[-1px] lg:mt-[1px] text-sm lg:text-xl" />
              </div>
              <div>Credenziali</div>
            </Link>
          </aside>
        </div>
        <main className="w-full lg:w-5/6">{children}</main>
      </div>
    </>
  );

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500 text-5xl py-2">
        <ClimbingBoxLoader color="#f2f3f8" size={30} speedMultiplier={2} />
      </div>
    );
  }
  switch (currentUser.role) {
    case "privato":
      return privatoSet;
    case "azienda":
      return aziendaSet;
    case "operatore":
      return noleggiatoreSet;
    default:
      return aziendaSet;
  }
};

export default DashboardLayout;

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
