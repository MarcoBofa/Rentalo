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
      "p-[15px] flex flex-row space-x-[10px] rounded text-sm lg:text-base transition duration-200";
    const inactiveStyle = "text-textSettings1"; // Custom color for inactive link
    const activeStyle = "bg-gray-200 text-blue-500 font-semibold"; // Style for active link
    const hoverStyle =
      "hover:bg-gray-200 hover:text-blue-500 hover:font-semibold"; // Style for hover

    return `${baseStyle} ${
      pathname === href ? activeStyle : `${inactiveStyle} ${hoverStyle}`
    }`;
  };

  let privatoSet = (
    <>
      <div className="flex flex-row pt-[90px] min-h-screen">
        <aside className="w-1/4 lg:w-1/6 top-21 left-0 bg-white text-black">
          <ul className="space-y-1 text-sm flex-grow">
            {/* <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 mt-1 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li> */}
            <li>
              <div className=" border-t ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/dashboard"
                className={linkClass("/dashboard/password")}
              >
                <FaLock className="mr-[11px] mb-[2px]" />
                Dashboard
              </Link>
            </li>
            <li>
              <div className=" border-t ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/dashboard/password"
                className={linkClass("/dashboard/password")}
              >
                <FaLock className="mr-[11px] mb-[2px]" />
                Password
              </Link>
            </li>
            <li>
              <div className=" border-t ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/dashboard/credenziali"
                className={linkClass("/dashboard/credenziali")}
              >
                <FaUserAlt className="mr-2 text-xl" />
                Credenziali
              </Link>
              <div className=" border-t ml-1 lg:ml-2 mt-1 mr-2"></div>
            </li>
          </ul>
        </aside>

        <main className="w-full lg:w-5/6">{children}</main>
      </div>
    </>
  );

  let aziendaSet = (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col pt-[90px] w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-textSettings1 mt-[30px] space-y-[100px]">
          <aside className="px-[20px] flex flex-col ">
            <span className="font-semibold pl-[15px] mb-[20px]">DASHBOARD</span>
            <Link
              href="/dashboard/parco-macchine"
              className={linkClass("/dashboard/parco-macchine")}
            >
              <div>
                <GiMineTruck
                  className="mr-[8px] mt-[-2px] text-lg "
                  size={26}
                />
              </div>
              <div>La mia flotta</div>
            </Link>
            <Link
              href="/dashboard/macchinari-noleggiati"
              className={linkClass("/dashboard/macchinari-noleggiati")}
            >
              <div>
                <GiTowTruck className="mr-[8px] mt-[-2px] text-lg " size={26} />
              </div>
              <div>Macchinari noleggiati</div>
            </Link>
            <Link
              href="/dashboard/analytics"
              className={linkClass("/dashboard/analytics")}
            >
              <div>
                <MdAnalytics
                  className="mr-[8px] mt-[-2px] text-lg "
                  size={26}
                />
              </div>
              <div>Analytics</div>
            </Link>
          </aside>
          <aside className="px-[20px] flex flex-col ">
            <span className="font-semibold pl-[15px] mb-[20px]">ACCOUNT</span>
            <Link
              href="/dashboard/password"
              className={linkClass("/dashboard/password")}
            >
              <div>
                <FaLock className="mr-[8px] mt-[2px] text-lg" size={18} />
              </div>
              <div>Password</div>
            </Link>
            <Link
              href="/dashboard/credenziali"
              className={linkClass("/dashboard/credenziali")}
            >
              <div>
                <FaUserAlt className="mr-[8px] mt-[2px] text-lg " size={18} />
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
      <div className="flex flex-row pt-[90px]">
        <aside className="w-1/4 lg:w-1/6 min-h-screen top-21 left-0 bg-white text-black ">
          <ul className="space-y-1 text-sm">
            {/* <li>
              <Link
                href="/Impostazioni/email"
                className="block py-2.5 mt-1 px-4 rounded transition duration-200 hover:bg-gray-700"
              >
                Email
              </Link>
            </li> */}
            <li className="">
              <div className="border-t ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/dashboard/password"
                className={linkClass("/dashboard/password")}
              >
                <FaLock className="mr-[11px] mb-[2px]" />
                Password
              </Link>
            </li>
            <li>
              <div className=" border-t  ml-1 lg:ml-2 mb-1 mr-2"></div>
              <Link
                href="/dashboard/credenziali"
                className={linkClass("/dashboard/credenziali")}
              >
                <MdAccountCircle className="mr-2 text-xl" />
                Credenziali
              </Link>
              <div className=" border-t ml-1 lg:ml-2 mt-1 mr-2"></div>
            </li>
          </ul>
        </aside>

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
