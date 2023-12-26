"use client";
import ImpostazioniLayout from "@/app/layout/impostazioniLayout";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/app/context/useContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const PasswordSettings: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [disabledBtn, setdisabledBtn] = useState(false);
  const { currentUser, userAccount } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    }

    if (
      userAccount?.provider === "google" ||
      userAccount?.provider === "github" ||
      userAccount?.provider === "facebook"
    ) {
      setdisabledBtn(true);
    }
  }, [currentUser, router]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    setShowModal(true);
  };

  const confirmUpdate = () => {
    axios
      .post("/api/cp", { email: currentUser?.email })
      .then(() => {
        toast.success(
          "Una mail con le istruzioni per il reset della password è stata inviata.",
          {
            duration: 5000,
          }
        );
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
  };

  return (
    <ImpostazioniLayout>
      <div className="flex flex-col items-center min-h-screen text-textSettings bg-settings py-2 py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mt-[50px] lg:mt-[200px] w-full lg:w-1/2 rounded h-[400px] lg:h-[350px] p-[10px] lg:p-[40px] bg-white">
          <h1 className="text-lg lg:text-xl font-bold mb-2">Password</h1>
          <h2 className="text-sm lg:text-base mb-4 px-2">
            Cambia la password associata al tuo account
          </h2>
          {userAccount ? (
            <div className="mb-4 w-full bg-red-100 text-red-400 rounded p-2 py-1 ">
              Siamo spiacenti ma non siamo in grado di modificare la password di
              un account creato tramite{" "}
              <span className="font-bold">{userAccount.provider}</span>, la
              preghiamo di riprovare sul sito del provider utilizzato.
            </div>
          ) : (
            <></>
          )}
          <div className="mb-4"></div>
          <form onSubmit={onSubmit} className="w-full pt-2 pb-1 ">
            <div className="mb-4">
              <label
                className="block text-textSettings mb-1 text-xs lg:text-base font-semibold"
                htmlFor="nome"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-xs lg:text-sm text-gray-700 leading-tight focus:outline-none mb-4 focus:shadow-outline`"
                id="nome"
                type="text"
                placeholder={
                  currentUser?.email ? `${currentUser.email}` : "Password"
                }
                disabled={true}
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={disabledBtn}
              >
                Modifica
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center bg-white w-[350px] h-[200px] p-5 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold mb-8">
              Confermare la richiesta di modifica?
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
    </ImpostazioniLayout>
  );
};

export default PasswordSettings;
