"use client";
import DashboardLayout from "@/app/layout/dashboardLayout";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/app/context/useContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  nome: string;
  cognome: string;
}

type FocusedState = {
  [key: string]: boolean;
};

const Analytics: React.FC = () => {
  const [focused, setFocused] = useState<FocusedState>({
    nome: false,
    cognome: false,
  });
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    }
  }, [currentUser, router]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      cognome: "",
    },
  });

  // Watch all form fields
  const watchedFields = watch();

  const isAtLeastOneFieldFilled = Object.values(watchedFields).some(
    (value) => value.trim() !== ""
  );

  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocused({ ...focused, [field]: false });
  };

  const onSubmit = (data: FormData) => {
    if (data.nome && currentUser && data.nome == currentUser.name) {
      toast.error("Il nome inserito è uguale a quello attuale");
    } else if (
      data.cognome &&
      currentUser &&
      data.cognome == currentUser.surname
    ) {
      toast.error("Il cognome inserito è uguale a quello attuale");
    } else {
      setShowModal(true);
    }
  };

  const confirmUpdate = () => {
    const data = watchedFields;

    axios
      .post("/api/uC", {
        nome: data.nome,
        cognome: data.cognome,
        user: currentUser,
      })
      .then((response) => {
        toast.success(response.data.message);
        reset();
        setShowModal(false);
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const inputStyle = (field: keyof FormData) => {
    // Using 'as' for type assertion
    const fieldValue = watchedFields[field as keyof FormData];
    return `shadow appearance-none border ${
      focused[field] || fieldValue ? "border-blue-500" : "border-gray-300"
    } rounded w-full py-2 px-3 text-xs lg:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center min-h-screen text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mt-[50px] lg:mt-[200px] w-full  lg:w-1/2 rounded h-[450px] lg:h-[400px] p-[10px] lg:p-[35px] bg-white">
          <h1 className="text-lg lg:text-xl font-bold mb-2">Analytics</h1>
          <h2 className="text-sm lg:text-base mb-2 px-2">
            Aggiorna le informazioni sul tuo account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-2 pb-1 ">
            <div className="mb-4">
              <label
                className="block text-textSettings text-sm lg:text-base font-semibold mb-2"
                htmlFor="nome"
              >
                Nome
              </label>
              <input
                className={inputStyle("nome")}
                id="nome"
                type="text"
                placeholder={
                  currentUser?.name
                    ? `${currentUser.name}`
                    : "Nome non inserito"
                }
                {...register("nome")}
                onFocus={() => handleFocus("nome")}
                onBlur={() => handleBlur("nome")}
              />
            </div>
            <div className="mb-6">
              <label
                className="block  text-textSettings text-sm lg:text-base font-semibold mb-2"
                htmlFor="cognome"
              >
                Cognome
              </label>
              <input
                className={inputStyle("cognome")}
                id="cognome"
                type="text"
                placeholder={
                  currentUser?.surname
                    ? `${currentUser.surname}`
                    : "Cognome non inserito"
                }
                {...register("cognome")}
                onFocus={() => handleFocus("cognome")}
                onBlur={() => handleBlur("cognome")}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white text-sm lg:text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={!isAtLeastOneFieldFilled}
              >
                Aggiorna
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="flex flex-col items-center justify-center bg-white w-[350px] h-[200px] p-5 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold mb-8">Confermare le modifiche?</h3>
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
    </DashboardLayout>
  );
};

export default Analytics;
