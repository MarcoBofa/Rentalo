"use client";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../../globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import toast from "react-hot-toast";
import axios from "axios";

interface InfoFormData {
  nome: string;
  telefono: string;
  email: string;
  regione: string;
  descrizione: string;
  noleggio: string;
  tipo: string;
}

type FocusedState = {
  [key: string]: boolean;
};

const InfoForm: FC = () => {
  const [focused, setFocused] = useState<FocusedState>({
    nome: false,
    telefono: false,
    email: false,
    regione: false,
    descrizione: false,
    noleggio: false,
    tipo: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InfoFormData>({
    defaultValues: {
      nome: "",
      telefono: "",
      email: "",
      regione: "",
      descrizione: "",
      noleggio: "",
      tipo: "",
    },
  });

  // Watch all form fields
  const watchedFields = watch();

  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocused({ ...focused, [field]: false });
  };

  const onSubmit = (data: InfoFormData) => {
    console.log("Form data:", data);

    // axios
    //   .get(
    //     `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VAL_KEY}Y&email=${data.email}`
    //   )
    //   .then((response) => {
    //     if (response.data.is_valid) {
    //       // Proceed with form submission if email is valid
    //       // Rest of your submission logic...
    //     } else {
    //       toast.error("Email non valido.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("Errore nella validazione dell'email.");
    //   });

    if (Object.keys(errors).length > 0) {
      console.log("Errors:", errors);
    }
    if (
      data.nome == "" ||
      data.telefono == "" ||
      data.email == "" ||
      data.regione == "" ||
      data.descrizione == "" ||
      data.noleggio == "" ||
      data.tipo == ""
    ) {
      toast.error("Riempire tutti i campi per mandare la richiesta");
    }

    axios
      .post("/api/richiestaMac", data)
      .then(() => {
        toast.success("Richiesta Inviata!");
      })
      .catch((error) => {
        // Check if the server responded with a message, otherwise use a default message
        const message =
          error.response?.data?.error || "Si è verificato un errore";
        toast.error(message);
      });

    reset();
  };

  const inputStyle = (field: keyof InfoFormData) => {
    // Using 'as' for type assertion
    const fieldValue = watchedFields[field as keyof InfoFormData];
    return `shadow appearance-none border ${
      focused[field] || fieldValue ? "border-orange-500" : "border-gray-300"
    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToasterProvider />
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-8 text-center">
          Richiedi informazioni su un macchinario
        </h2>
        <form
          className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nome"
              >
                Nome
              </label>
              <input
                className={inputStyle("nome")}
                id="nome"
                type="text"
                placeholder="Nome"
                {...register("nome")}
                onFocus={() => handleFocus("nome")}
                onBlur={() => handleBlur("nome")}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Telefono
              </label>
              <input
                className={inputStyle("telefono")}
                id="telefono"
                type="text"
                placeholder="Telefono"
                {...register("telefono")}
                onFocus={() => handleFocus("telefono")}
                onBlur={() => handleBlur("telefono")}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={inputStyle("email")}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="regione"
            >
              Regione
            </label>
            <select
              id="regione"
              className={`shadow border ${
                focused["regione"] || watchedFields["regione"]
                  ? "border-orange-500"
                  : "border-gray-300"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              {...register("regione")} // Register the select element
              onFocus={() => handleFocus("regione")}
              onBlur={() => handleBlur("regione")}
            >
              <option value="">Seleziona una regione</option>
              <option value="Abruzzo">Abruzzo</option>
              <option value="Basilicata">Basilicata</option>
              <option value="Calabria">Calabria</option>
              <option value="Campania">Campania</option>
              <option value="Emilia-Romagna">Emilia-Romagna</option>
              <option value="Friuli-Venezia Giulia">
                Friuli-Venezia Giulia
              </option>
              <option value="Lazio">Lazio</option>
              <option value="Liguria">Liguria</option>
              <option value="Lombardia">Lombardia</option>
              <option value="Marche">Marche</option>
              <option value="Molise">Molise</option>
              <option value="Piemonte">Piemonte</option>
              <option value="Puglia">Puglia</option>
              <option value="Sardegna">Sardegna</option>
              <option value="Sicilia">Sicilia</option>
              <option value="Toscana">Toscana</option>
              <option value="Trentino-Alto Adige">Trentino-Alto Adige</option>
              <option value="Umbria">Umbria</option>
              <option value="Valle d'Aosta">Valle d'Aosta</option>
              <option value="Veneto">Veneto</option>
            </select>
          </div>
          <div className="mb-4 flex flex-row ">
            <div className="w-1/2 mr-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="noleggio"
              >
                Noleggio o Affitto?
              </label>
              <select
                id="noleggio"
                className={`shadow border ${
                  focused["noleggio"] || watchedFields["noleggio"]
                    ? "border-orange-500"
                    : "border-gray-300"
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                {...register("noleggio")}
                onFocus={() => handleFocus("noleggio")}
                onBlur={() => handleBlur("noleggio")}
              >
                <option value="">Seleziona una delle opzioni</option>
                <option value="noleggio">Noleggio</option>
                <option value="affitto">Affitto</option>
              </select>
            </div>
            <div className="w-1/2 ml-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="tipo"
              >
                Tipo di macchinario
              </label>
              <select
                id="tipo"
                className={`shadow border ${
                  focused["tipo"] || watchedFields["tipo"]
                    ? "border-orange-500"
                    : "border-gray-300"
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                {...register("tipo")}
                onFocus={() => handleFocus("tipo")}
                onBlur={() => handleBlur("tipo")}
              >
                <option value="">Seleziona un tipo</option>
                <option value="grande">Grandi Macchinari</option>
                <option value="medi">Medi Macchinari</option>
                <option value="piccoli">Piccoli Macchinari</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="messaggio"
            >
              Macchinario
            </label>
            <textarea
              className={inputStyle("descrizione")}
              id="descrizione"
              placeholder="Descrivi brevemente il macchinario che ti interessa"
              rows={5}
              {...register("descrizione")}
              onFocus={() => handleFocus("descrizione")}
              onBlur={() => handleBlur("descrizione")}
            />
          </div>
          <div className="flex items-center justify-center justify-between">
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white w-[200px] text-lg font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mx-auto block"
              type="submit"
            >
              Invia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoForm;
