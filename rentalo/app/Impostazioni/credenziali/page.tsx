"use client";
import ImpostazioniLayout from "@/app/layout/impostazioniLayout";
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

const CredenzialiSettings: React.FC = () => {
  const [focused, setFocused] = useState<FocusedState>({
    nome: false,
    cognome: false,
  });
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  if (!currentUser) {
    router.push("/Login");
  }

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
    console.log("Form data:", data);

    axios
      .post("/api/uC", {
        nome: data.nome,
        cognome: data.cognome,
        user: currentUser,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });

    reset();
  };

  const inputStyle = (field: keyof FormData) => {
    // Using 'as' for type assertion
    const fieldValue = watchedFields[field as keyof FormData];
    return `shadow appearance-none border ${
      focused[field] || fieldValue ? "border-orange-500" : "border-gray-300"
    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
  };

  return (
    <ImpostazioniLayout>
      <div className="flex flex-col items-center min-h-screen text-textSettings bg-settings py-2">
        <div className="flex flex-col items-center justify-center mt-[200px] w-1/2 rounded h-[350px] bg-white">
          <h1 className="text-xl font-bold mb-2">Account</h1>
          <h2 className="text-md mb-2 ">
            Aggiorna le informazioni sul tuo account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-8 pt-2 pb-1 "
          >
            <div className="mb-4">
              <label
                className="block  text-textSettings  text-sm font-bold mb-2"
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
                className="block  text-textSettings  text-sm font-bold mb-2"
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
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={!isAtLeastOneFieldFilled}
              >
                Aggiorna
              </button>
            </div>
          </form>
        </div>
      </div>
    </ImpostazioniLayout>
  );
};

export default CredenzialiSettings;
