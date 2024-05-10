import React from "react";
import DashboardLayout from "@/app/layout/dashboardLayout";
import Link from "next/link";

const DefaultDashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center min-h-screen text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mt-[50px] lg:mt-[200px]  w-full lg:w-1/2 rounded h-[350px] p-[10px] lg:p-[40px] bg-white">
          <h1 className="text-xl font-bold mb-2">Dashboard</h1>
          <h2 className="text-md mb-10 ">
            Gestisci tutto quello che riguarda il tuo profilo.
          </h2>
          <div className="flex flex-row mb-4">
            <Link href="/dashboard/password" className="mr-5 lg:mr-10">
              <button className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded">
                Password
              </button>
            </Link>
            <Link href="/dashboard/credenziali">
              <button className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded">
                Credenziali
              </button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DefaultDashboardPage;
