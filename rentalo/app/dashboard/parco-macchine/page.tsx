"use client";
import DashboardLayout from "@/app/layout/dashboardLayout";
import { useContext, useEffect } from "react";
import UserContext from "@/app/context/useContext";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import Link from "next/link";

const ParcoMacchine: React.FC = () => {
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    }
  }, [currentUser, router]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mt-[155px] lg:mt-[200px] w-full lg:w-1/2 rounded h-[350px] p-[10px] lg:p-[40px] bg-white">
          <h1 className="text-xl font-bold mb-2">Dashboard</h1>
          <h2 className="text-md mb-10 ">Gestisci il tuo parco macchine</h2>
          <div className="flex flex-row mb-4">
            <Link
              href="/dashboard/parco-macchine/aggiungi"
              className="mr-5 lg:mr-10"
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded">
                Aggiungi
              </button>
            </Link>
            <Link href="/dashboard/parco-macchine/gestisci">
              <button className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded">
                Gestisci
              </button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParcoMacchine;
