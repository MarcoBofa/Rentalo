"use client";
import React, { FC, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import "@/app/globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import toast from "react-hot-toast";
import axios from "axios";

interface macchinario {
  regione: string;
  descrizione: string;
  tipo: string;
}

interface InfoFormData {
  nome: string;
  telefono: string;
  email: string;
  macchinario: macchinario[];
}

type FocusedState = {
  [key: string]: boolean;
};

const InfoForm: FC = () => {
  const [focused, setFocused] = useState<FocusedState>({
    nome: false,
    telefono: false,
    email: false,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InfoFormData>({
    defaultValues: {
      nome: "",
      telefono: "",
      email: "",
      macchinario: [{ regione: "", tipo: "", descrizione: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "macchinario",
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
    //console.log("Form data:", data);

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
    let lenght = data.macchinario.length - 1;
    if (
      data.nome == "" ||
      data.telefono == "" ||
      data.email == "" ||
      data.macchinario[lenght].regione == "" ||
      data.macchinario[lenght].tipo == "" ||
      data.macchinario[lenght].descrizione == ""
    ) {
      toast.error("Riempire tutti i campi per mandare la richiesta");
      return;
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
    <div className="flex flex-col form-background items-center justify-center min-h-screen bg-gray-100 pt-[120px]">
      <ToasterProvider />
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Indicaci il macchinario che vuoi noleggiare
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

          {fields.map((item, index) => (
            <div
              key={item.id}
              className={`mb-4 ${
                index !== 0 ? "pt-4 border-t-2 border-gray-300" : ""
              }`}
            >
              <div className="mb-4 flex flex-row ">
                <div className="w-1/2 mr-5">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="regione"
                  >
                    Regione
                  </label>
                  <select
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    {...register(`macchinario.${index}.tipo`)}
                    {...register(`macchinario.${index}.regione`)}
                    onFocus={() => handleFocus(`macchinario.${index}.regione`)}
                    onBlur={() => handleBlur(`macchinario.${index}.regione`)}
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
                    <option value="Trentino-Alto Adige">
                      Trentino-Alto Adige
                    </option>
                    <option value="Umbria">Umbria</option>
                    <option value="Valle d'Aosta">Valle d'Aosta</option>
                    <option value="Veneto">Veneto</option>
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
                    className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    {...register(`macchinario.${index}.tipo`)}
                    onFocus={() => handleFocus(`macchinario.${index}.tipo`)}
                    onBlur={() => handleBlur(`macchinario.${index}.tipo`)}
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
                  className={`shadow appearance-none border "border-orange-500" : "border-gray-300"
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  placeholder="Descrivi brevemente il macchinario"
                  rows={5}
                  {...register(`macchinario.${index}.descrizione`)}
                  onFocus={() =>
                    handleFocus(`macchinario.${index}.descrizione`)
                  }
                  onBlur={() => handleBlur(`macchinario.${index}.descrizione`)}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="mt-2 bg-red-500 text-white rounded-sm removebtn"
                    onClick={() => remove(index)}
                  >
                    Rimuovi
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-4">
            {/* Placeholder div to balance the layout */}
            <div></div>

            {/* Invia Button - Centered */}
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white w-[150px] lg:w-[200px] text-lg font-bold lg:ml-[120px] py-3 px-6 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Invia
            </button>

            {/* Add Macchinario Button - Right */}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white p-1 lg:p-2 rounded"
              onClick={() => append({ regione: "", tipo: "", descrizione: "" })}
            >
              Aggiungi Macchinario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoForm;
