"use client";
import DashboardLayout from "@/app/layout/dashboardLayout";
import { CSSProperties, useContext, useEffect, useState } from "react";
import UserContext from "@/app/context/useContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "@/app/globals.css";

type FocusedState = {
  [key: string]: boolean;
};

interface FormData {
  [key: string]: any;
  id: string;
  nome: string;
  tipo: string;
  descrizione: string;
  portata?: string;
  peso?: number;
  produttore: string;
  altezzaLavoro?: number;
  dimensioneCarro?: string;
  dimensioneCassone?: string;
  customFields: Array<{ id: string; name: string; value: string }>;
}

const aggiungiMacchinario: React.FC = () => {
  const [focused, setFocused] = useState<FocusedState>({});
  const [macchinari, setMacchinari] = useState<FormData[]>([]);

  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const [pesoError, setError] = useState("");
  const [altezzaLavoroError, setAltezzaError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    } else {
      axios
        .get("/api/getMac")
        .then((response) => {
          setMacchinari(response.data);
        })
        .catch((error) => {
          console.error("Error fetching machinery data:", error);
        });
    }
  }, [currentUser, router]);

  // const isAtLeastOneFieldFilled = Object.values(watchedFields).some(
  //   (value) => value.trim() !== ""
  // );

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mb-[44px] mt-[155px] lg:mt-[150px] w-full  lg:w-1/2 rounded  p-[10px] lg:p-[35px] bg-white">
          <h1 className="text-lg lg:text-xl font-bold mb-2">
            Gestisci i macchinari della tua azienda
          </h1>
        </div>
        <div className="w-full px-4 lg:px-0">
          {macchinari.length > 0 ? (
            <div className="flex flex-wrap gap-6 px-4 lg:px-8 text-sm lg:text-base">
              {macchinari.map((mac) => (
                <div
                  key={mac.id}
                  className="bg-white p-5 rounded-lg shadow-lg flex flex-col w-full sm:w-72 md:w-80 lg:w-96 flex-grow"
                >
                  <h2 className="text-xl font-semibold mb-2">{mac.nome}</h2>
                  <div className="flex bg-cyan-100 w-1/2 h-[100px] justify-center text-center items-center mb-2 ">
                    IMAGE
                  </div>
                  <hr className="my-2 mr-[100px] md:mr-[180px]" />
                  <p className="text-gray-500 mb-2">
                    Tipo:{" "}
                    <span className="font-bold text-gray-600">{mac.tipo}</span>
                  </p>
                  <hr className="my-2 mr-5" />
                  <p className="text-gray-500 mb-2">
                    Descrizione:{" "}
                    <span className="font-bold text-gray-600">
                      {mac.descrizione}
                    </span>
                  </p>
                  <hr className="my-2 mr-5" />
                  <p className="text-gray-500 mb-2">
                    Portata:{" "}
                    <span className="font-bold text-gray-600">
                      {mac.portata || "N/A"}
                    </span>
                  </p>
                  <hr className="my-2 mr-5" />
                  <p className="text-gray-500 mb-2">
                    Peso:{" "}
                    <span className="font-bold text-gray-600">
                      {mac.peso ? `${mac.peso} kg` : "N/A"}
                    </span>
                  </p>
                  <hr className="my-2 mr-5" />
                  <p className="text-gray-500 mb-2">
                    Produttore:{" "}
                    <span className="font-bold text-gray-600">
                      {mac.produttore}
                    </span>
                  </p>
                  <hr className="my-2 mr-5" />
                  <p className="text-gray-500 mb-2">
                    Altezza Lavoro:{" "}
                    <span className="font-bold text-gray-600">
                      {mac.altezzaLavoro ? `${mac.altezzaLavoro} m` : "N/A"}
                    </span>
                  </p>
                  <hr className="my-2 mr-5" />
                  <p className="text-gray-500 mb-2">
                    Dimensione Carro:{" "}
                    <span className="font-bold text-gray-600">
                      {mac.dimensioneCarro || "N/A"}
                    </span>
                  </p>
                  <hr className="my-2 mr-5" />
                  <p className="text-gray-500 mb-2">
                    Dimensione Cassone:{" "}
                    <span className="font-bold text-gray-600">
                      {mac.dimensioneCassone || "N/A"}
                    </span>
                  </p>
                  {mac.customFields && mac.customFields.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Custom Fields:</h3>
                      <ul className="list-disc list-inside">
                        {mac.customFields.map((field) => (
                          <li key={field.id} className="text-gray-600">
                            {field.name}: {field.value}
                          </li>
                        ))}
                      </ul>
                      <hr className="my-2 mr-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-10">Caricamento...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default aggiungiMacchinario;
