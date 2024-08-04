"use client";
import DashboardLayout from "@/app/layout/dashboardLayout";
import { CSSProperties, useContext, useEffect, useState } from "react";
import UserContext from "@/app/context/useContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "@/app/globals.css";
import { refresh } from "aos";

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
  attributi: Array<{ id: string; name: string; value: string }>;
}

interface DeleteForm {
  tipo: string;
  id: string;
}

const gestisciMacchinari: React.FC = () => {
  const [focused, setFocused] = useState<FocusedState>({});
  const [macchinari, setMacchinari] = useState<FormData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<DeleteForm>();

  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const [selection, setSelection] = useState("attrezzatura");

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    } else {
      axios
        .get("/api/getMac")
        .then((response) => {
          //console.log(response.data);
          setMacchinari(response.data);
        })
        .catch((error) => {
          console.error("Error fetching machinery data:", error);
        });
    }
  }, [currentUser, router]);

  const deleteAction = (mac: DeleteForm) => {
    setDeleteId(mac);
    setShowModal(true);
  };

  const confirmUpdate = () => {
    axios
      .post("/api/deleteMac", {
        email: currentUser?.email,
        userId: currentUser?.id,
        mac: deleteId,
      })
      .then(() => {
        toast.success("Il macchinario è stato rimosso correttamente", {
          duration: 5000,
        });
      })
      .catch((error) => {
        // Check if the server responded with a message, otherwise use a default message
        const message = error.response?.data?.error || "An error occurred!";
        toast.error(message, {
          duration: 8000, // duration in milliseconds (e.g., 5000ms = 5 seconds)
        });
        return;
      });
    setShowModal(false);
    router.refresh();
  };

  const handleSelectBtn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(event.target.value);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mb-[26px] mt-[155px] lg:mt-[110px] w-full  lg:w-1/2 rounded  p-[10px] lg:p-[25px] bg-white">
          <h1 className="text-lg lg:text-xl font-bold mb-2">
            Gestisci il tuo parco macchine
          </h1>
        </div>

        <div className="w-full lg:px-0">
          {macchinari.length > 0 ? (
            <>
              <select
                className="flex cursor-pointer text-center w-[160px] lg:ml-8 rounded h-[40px] border-gray-300 bg-gray-200 border-2 mb-5"
                id="selection"
                onChange={(e) => handleSelectBtn(e)}
              >
                <option value="attrezzatura">Attrezzatura</option>
                <option value="sollevamento">Sollevamento</option>
                <option value="autocarri">Autocarri</option>
                <option value="pale">Pale</option>
                <option value="all">Tutti</option>
              </select>
              <div className="flex flex-wrap gap-8 lg:px-8 text-sm lg:text-base mb-5 ">
                {macchinari.map((mac) => (
                  <>
                    {mac.tipo == "attrezzatura" &&
                      (selection == "attrezzatura" || selection == "all") && (
                        <div
                          key={mac.id}
                          className="bg-white p-5 rounded-lg shadow-lg flex flex-col w-full sm:w-72 md:w-80 lg:w-96 flex-grow max-w-[500px] relative group"
                        >
                          <button
                            onClick={() =>
                              deleteAction({ tipo: mac.tipo, id: mac.id })
                            }
                            className="bg-red-400 rounded-full w-[25px] h-[25px] absolute top-2 right-2 flex items-center justify-center font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            x
                          </button>

                          <h2 className="text-xl font-semibold mb-2">
                            {mac.nome}
                          </h2>
                          <div className="flex bg-gray-100 border-gray-200 border-2 w-1/2 h-[140px] justify-center text-center items-center mb-2 ">
                            IMAGE
                          </div>
                          <hr className="my-2 mr-[100px] md:mr-[180px]" />
                          <p className="text-gray-500 mb-2">
                            Tipo:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.tipo}
                            </span>
                          </p>
                          <hr className="my-2 mr-5" />
                          {mac.portata && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Portata:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.portata ? `${mac.portata} kg` : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          {mac.peso && mac.peso > 0 && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Peso:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.peso ? `${mac.peso} kg` : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          <p className="text-gray-500 mb-2">
                            Produttore:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.produttore}
                            </span>
                          </p>
                          <hr className="my-2 mr-5" />
                          {mac.altezzaLavoro && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Altezza Lavoro:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.altezzaLavoro
                                    ? `${mac.altezzaLavoro} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}

                          {mac.dimensioneCarro && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Dimensione Carro:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.dimensioneCarro
                                    ? `${mac.dimensioneCarro} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          {mac.dimensioneCassone && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Dimensione Cassone:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.dimensioneCassone
                                    ? `${mac.dimensioneCassone} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          <p className="text-gray-500 mb-2">
                            Descrizione:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.descrizione}
                            </span>
                          </p>
                          {mac.attributi && mac.attributi.length > 0 && (
                            <>
                              <div className="mt-4">
                                <hr className="my-2 mr-5" />
                                <h3 className="font-semibold mb-2">
                                  Attributi personalizzati:
                                </h3>
                                <ul className="list-disc list-inside">
                                  {mac.attributi.map((field) => (
                                    <li
                                      key={field.id}
                                      className="text-gray-600"
                                    >
                                      {field.name}: {field.value}
                                    </li>
                                  ))}
                                </ul>
                                <hr className="my-2 mr-5" />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                  </>
                ))}
                {selection == "all" && (
                  <div className="my-2 mr-5 w-full h-[2px] bg-gray-300 mb-5" />
                )}
              </div>

              <div className="flex flex-wrap gap-8 lg:px-8 text-sm lg:text-base mb-5">
                {macchinari.map((mac) => (
                  <>
                    {mac.tipo == "sollevamento" &&
                      (selection == "sollevamento" || selection == "all") && (
                        <div
                          key={mac.id}
                          className="bg-white p-5 rounded-lg shadow-lg flex flex-col w-full sm:w-72 md:w-80 lg:w-96 flex-grow max-w-[500px] relative group"
                        >
                          <button
                            onClick={() =>
                              deleteAction({ tipo: mac.tipo, id: mac.id })
                            }
                            className="bg-red-400 rounded-full w-[25px] h-[25px] absolute top-2 right-2 flex items-center justify-center font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            x
                          </button>
                          <h2 className="text-xl font-semibold mb-2">
                            {mac.nome}
                          </h2>
                          <div className="flex bg-gray-100 border-gray-200 border-2 w-1/2 h-[140px] justify-center text-center items-center mb-2 ">
                            IMAGE
                          </div>
                          <hr className="my-2 mr-[100px] md:mr-[180px]" />
                          <p className="text-gray-500 mb-2">
                            Tipo:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.tipo}
                            </span>
                          </p>
                          <hr className="my-2 mr-5" />
                          {mac.portata && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Portata:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.portata ? `${mac.portata} kg` : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          {mac.peso && mac.peso > 0 && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Peso:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.peso ? `${mac.peso} kg` : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          <p className="text-gray-500 mb-2">
                            Produttore:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.produttore}
                            </span>
                          </p>
                          <hr className="my-2 mr-5" />
                          {mac.altezzaLavoro && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Altezza Lavoro:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.altezzaLavoro
                                    ? `${mac.altezzaLavoro} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}

                          {mac.dimensioneCarro && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Dimensione Carro:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.dimensioneCarro
                                    ? `${mac.dimensioneCarro} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          {mac.dimensioneCassone && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Dimensione Cassone:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.dimensioneCassone
                                    ? `${mac.dimensioneCassone} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          <p className="text-gray-500 mb-2">
                            Descrizione:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.descrizione}
                            </span>
                          </p>
                          {mac.attributi && mac.attributi.length > 0 && (
                            <>
                              <div className="mt-4">
                                <hr className="my-2 mr-5" />
                                <h3 className="font-semibold mb-2">
                                  Attributi personalizzati:
                                </h3>
                                <ul className="list-disc list-inside">
                                  {mac.attributi.map((field) => (
                                    <li
                                      key={field.id}
                                      className="text-gray-600"
                                    >
                                      {field.name}: {field.value}
                                    </li>
                                  ))}
                                </ul>
                                <hr className="my-2 mr-5" />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                  </>
                ))}
                {selection == "all" && (
                  <div className="my-2 mr-5 w-full h-[2px] bg-gray-300 mb-5" />
                )}
              </div>

              <div className="flex flex-wrap gap-8 lg:px-8 text-sm lg:text-base mb-5">
                {macchinari.map((mac) => (
                  <>
                    {mac.tipo == "autocarri" &&
                      (selection == "autocarri" || selection == "all") && (
                        <div
                          key={mac.id}
                          className="bg-white p-5 rounded-lg shadow-lg flex flex-col w-full sm:w-72 md:w-80 lg:w-96 flex-grow max-w-[500px] relative group"
                        >
                          <button
                            onClick={() =>
                              deleteAction({ tipo: mac.tipo, id: mac.id })
                            }
                            className="bg-red-400 rounded-full w-[25px] h-[25px] absolute top-2 right-2 flex items-center justify-center font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            x
                          </button>
                          <h2 className="text-xl font-semibold mb-2">
                            {mac.nome}
                          </h2>
                          <div className="flex bg-gray-100 border-gray-200 border-2 w-1/2 h-[140px] justify-center text-center items-center mb-2 ">
                            IMAGE
                          </div>
                          <hr className="my-2 mr-[100px] md:mr-[180px]" />
                          <p className="text-gray-500 mb-2">
                            Tipo:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.tipo}
                            </span>
                          </p>
                          <hr className="my-2 mr-5" />
                          {mac.portata && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Portata:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.portata ? `${mac.portata} kg` : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          {mac.peso && mac.peso > 0 && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Peso:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.peso ? `${mac.peso} kg` : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          <p className="text-gray-500 mb-2">
                            Produttore:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.produttore}
                            </span>
                          </p>
                          <hr className="my-2 mr-5" />
                          {mac.altezzaLavoro && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Altezza Lavoro:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.altezzaLavoro
                                    ? `${mac.altezzaLavoro} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}

                          {mac.dimensioneCarro && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Dimensione Carro:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.dimensioneCarro
                                    ? `${mac.dimensioneCarro} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          {mac.dimensioneCassone && (
                            <>
                              <p className="text-gray-500 mb-2">
                                Dimensione Cassone:{" "}
                                <span className="font-bold text-gray-600">
                                  {mac.dimensioneCassone
                                    ? `${mac.dimensioneCassone} m`
                                    : "N/A"}
                                </span>
                              </p>
                              <hr className="my-2 mr-5" />
                            </>
                          )}
                          <p className="text-gray-500 mb-2">
                            Descrizione:{" "}
                            <span className="font-bold text-gray-600">
                              {mac.descrizione}
                            </span>
                          </p>
                          {mac.attributi && mac.attributi.length > 0 && (
                            <>
                              <div className="mt-4">
                                <hr className="my-2 mr-5" />
                                <h3 className="font-semibold mb-2">
                                  Attributi personalizzati:
                                </h3>
                                <ul className="list-disc list-inside">
                                  {mac.attributi.map((field) => (
                                    <li
                                      key={field.id}
                                      className="text-gray-600"
                                    >
                                      {field.name}: {field.value}
                                    </li>
                                  ))}
                                </ul>
                                <hr className="my-2 mr-5" />
                              </div>
                            </>
                          )}
                        </div>
                      )}
                  </>
                ))}
              </div>
              {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                  <div className="flex flex-col items-center justify-center bg-white w-[350px] h-[200px] p-5 rounded-lg shadow-lg text-center">
                    <h3 className="text-lg font-bold mb-8">
                      Confermare la rimozione del Macchinario?
                    </h3>
                    <div>
                      <button
                        onClick={confirmUpdate}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-10"
                      >
                        Conferma
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Annulla
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-center mt-10">Caricamento...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default gestisciMacchinari;
