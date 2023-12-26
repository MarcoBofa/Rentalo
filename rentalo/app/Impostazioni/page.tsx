import React from "react";
import ImpostazioniLayout from "@/app/layout/impostazioniLayout";
import Link from "next/link";

const DefaultImpostazioniPage: React.FC = () => {
  return (
    <ImpostazioniLayout>
      <div className="flex flex-col items-center min-h-screen text-textSettings bg-settings py-2">
        <div className="flex flex-col items-center justify-center mt-[50px] lg:mt-[200px] w-2/3 lg:w-1/2 rounded h-[350px] p-[40px] bg-white">
          <h1 className="text-xl font-bold mb-2">Impostazioni</h1>
          <h2 className="text-md mb-10 ">
            Modifica le informazioni del tuo profilo
          </h2>
          <div className="flex flex-row mb-4">
            <Link href="/Impostazioni/password" className="mr-10">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Password
              </button>
            </Link>
            <Link href="/Impostazioni/credenziali">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Credenziali
              </button>
            </Link>
          </div>
        </div>
      </div>
    </ImpostazioniLayout>
  );
};

export default DefaultImpostazioniPage;
