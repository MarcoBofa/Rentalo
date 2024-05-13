"use client";
import DashboardLayout from "@/app/layout/dashboardLayout";
import { CSSProperties, useContext, useEffect, useState } from "react";
import UserContext from "@/app/context/useContext";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import "@/app/globals.css";

interface FormData {
  [key: string]: any;
  nome: string;
  categoria: string;
  descrizione: string;
  portata?: string;
  peso?: number;
  produttore: string;
  altezzaLavoro?: number;
  dimensioneCarro?: string;
  dimensioneCassone?: string;
  customFields: Array<{ id: string; name: string; value: string }>;
}

type FocusedState = {
  [key: string]: boolean;
};

const aggiungiMacchinario: React.FC = () => {
  const [focused, setFocused] = useState<FocusedState>({});

  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const [pesoError, setError] = useState("");
  const [altezzaLavoroError, setAltezzaError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.push("/Login");
    }
  }, [currentUser, router]);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      categoria: "",
      descrizione: "",
      portata: "",
      produttore: "",
      dimensioneCarro: "",
      dimensioneCassone: "",
      customFields: [],
    },
  });

  // Watch all form fields
  const watchedFields = watch();
  const categoria = watch("categoria");
  const pesoWatch = watch("peso");

  const checkFields = (event: any) => {
    const value = parseFloat(event.target.value);
    const regex = /[^0-9.]/;
    const regexDots = /^(?:\.\d*|\d*\.$|(\d*\.){2,})/;

    if (event.target.value === "") {
      setError("");
    } else if (value < 0) {
      setError("Valore deve essere maggiore di 0.");
    } else if (regex.test(event.target.value)) {
      setError("Inserire un valore numerico.");
    } else if (regexDots.test(event.target.value)) {
      setError("Inserire un valore numerico valido.");
    } else {
      setError("");
    }
  };

  const checkFieldsAltezza = (event: any) => {
    const value = parseFloat(event.target.value);
    const regex = /[^0-9.]/;
    const regexDots = /^(?:\.\d*|\d*\.$|(\d*\.){2,})/;

    if (event.target.value === "") {
      setAltezzaError("");
    } else if (value < 0) {
      setAltezzaError("Valore deve essere maggiore di 0.");
    } else if (regex.test(event.target.value)) {
      setAltezzaError("Inserire un valore numerico.");
    } else if (regexDots.test(event.target.value)) {
      setAltezzaError("Inserire un valore numerico valido.");
    } else {
      setAltezzaError("");
    }
  };

  const checkBtn = () => {
    if (pesoError || altezzaLavoroError) {
      return true;
    } else {
      return false;
    }
  };

  // const isAtLeastOneFieldFilled = Object.values(watchedFields).some(
  //   (value) => value.trim() !== ""
  // );

  const handleFocus = (field: string) => {
    setFocused((prevFocused) => ({ ...prevFocused, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocused((prevFocused) => ({ ...prevFocused, [field]: false }));
  };
  const onSubmit = (data: FormData) => {
    if (
      data.nome === "" ||
      data.categoria === "" ||
      data.produttore === "" ||
      data.descrizione === ""
    ) {
      toast.error("Riempire tutti i campi obbligatori (*)");
    } else {
      let isCustomFieldEmpty = false;
      for (let field of data.customFields) {
        if (field.name.trim() === "" || field.value.trim() === "") {
          toast.error("Riempire i campi personalizzati aggiunti");
          isCustomFieldEmpty = true;
        }
      }
      if (!isCustomFieldEmpty) {
        data.customFields = data.customFields.filter(
          (field) => field.name.trim() !== "" && field.value.trim() !== ""
        );
        setShowModal(true);
      }
    }
  };

  const confirmUpdate = () => {
    const data = watchedFields;
    console.log(data);

    // Object.entries(data).forEach(([key, value]) => {
    //   if (value === "" || value == null) {
    //     delete data[key];
    //   }
    // });

    axios
      .post("/api/aggMac", {
        nome: data.nome,
        categoria: data.categoria,
        descrizione: data.descrizione,
        produttore: data.produttore,
        peso: data.peso,
        altezzaLavoro: data.altezzaLavoro,
        portata: data.portata,
        dimensioneCarro: data.dimensioneCarro,
        dimensioneCassone: data.dimensioneCassone,
        customFields: data.customFields,
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
    setShowModal(false);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const inputStyle = (field: string) => {
    const fieldValue = watch(field as any);
    if (
      (field === "peso" && pesoError) ||
      (field === "altezzaLavoro" && altezzaLavoroError)
    ) {
      return `shadow appearance-none border border-red-400 rounded w-full py-2 px-3 text-xs lg:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
    } else {
      return `shadow appearance-none border ${
        focused[field] || fieldValue ? "border-blue-500" : "border-gray-300"
      } rounded w-full py-2 px-3 text-xs lg:text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mb-[44px] mt-[80px] md:mt-[110px] lg:mt-[150px] w-full md:w-2/3 lg:w-1/2 rounded  p-[10px] lg:p-[35px] bg-white">
          <h1 className="text-lg lg:text-xl font-bold mb-2">
            Aggiungi un macchinario al tuo parco macchine.
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-2 pb-1 ">
            <div className="mb-4">
              <label
                className="block text-textSettings text-sm lg:text-base font-semibold mb-2"
                htmlFor="nome"
              >
                Nome del macchinario*
              </label>
              <input
                className={inputStyle("nome")}
                id="nome"
                type="text"
                placeholder="Modello"
                {...register("nome")}
                onFocus={() => handleFocus("nome")}
                onBlur={() => handleBlur("nome")}
              />
            </div>
            <div className="mb-6">
              <label
                className="block  text-textSettings text-sm lg:text-base font-semibold mb-2"
                htmlFor="categoria"
              >
                Categoria macchinario*
              </label>
              <select
                className={inputStyle("categoria")}
                {...register(`categoria`)}
                onFocus={() => handleFocus(`categoria`)}
                onBlur={() => handleBlur(`categoria`)}
                id="categoria"
                onChange={(e) => {
                  resetField("dimensioneCarro");
                  resetField("altezzaLavoro");
                  resetField("portata");
                  resetField("dimensioneCassone");
                  setError("");
                  setAltezzaError("");
                  setValue("categoria", e.target.value);
                  setValue("customFields", []);
                }}
              >
                <option value="">Seleziona una categoria</option>
                <option value="Sollevamento">Sollevamento</option>
                <option value="Attrezzatura">Attrezzatura</option>
                <option value="Autocarri">Autocarri</option>
              </select>
            </div>
            <div className="flex flex-row w-full space-x-[30px] mb-6">
              <div className="w-1/2">
                <label
                  className="block  text-textSettings text-sm lg:text-base font-semibold mb-2"
                  htmlFor="produttore"
                >
                  Produttore*
                </label>
                <input
                  className={inputStyle("produttore")}
                  id="produttore"
                  type="text"
                  placeholder={"Nome del produttore"}
                  {...register("produttore")}
                  onFocus={() => handleFocus("produttore")}
                  onBlur={() => handleBlur("produttore")}
                />
              </div>
              <div className="w-1/2 relative">
                <div className="flex flex-row items-center">
                  <label
                    className="block text-textSettings text-sm lg:text-base font-semibold mb-2"
                    htmlFor="peso"
                  >
                    Peso
                  </label>
                  <div className="flex hoverable-button justify-center items-center w-[13px] h-[13px] ml-1 mb-2 rounded-full bg-gray-200 text-xs leading-none cursor-pointer">
                    i
                  </div>
                  <span className="important-style display-on-hover absolute top-[-73px] left-[25px] lg:left-[150px] ml-2 w-[110px] p-2 text-white bg-gray-400 text-xs rounded-lg shadow">
                    Inserisci il peso del macchinario in{" "}
                    <span className="font-bold underline">kg.</span>
                  </span>
                </div>
                <input
                  className={inputStyle("peso")}
                  id="peso"
                  type="text"
                  placeholder={"kg"}
                  {...register("peso")}
                  onChange={(e) => checkFields(e)}
                  onFocus={() => handleFocus("peso")}
                  onBlur={() => handleBlur("peso")}
                />
                {pesoError && (
                  <div className="flex items-center justify-center text-xs text-red-600 bg-red-200 rounded-sm mt-[3px]">
                    {" "}
                    {pesoError}{" "}
                  </div>
                )}
              </div>
            </div>
            {categoria === "" && (
              <>
                <div className="mb-6">
                  <div className="flex relative flex-row items-center">
                    <label
                      className="block text-textSettings text-sm lg:text-base font-semibold mb-2"
                      htmlFor="altezzaLavoro"
                    >
                      Altezza di lavoro
                    </label>
                    <div className="flex hoverable-button justify-center items-center w-[13px] h-[13px] ml-1 mb-2 rounded-full bg-gray-200 text-xs leading-none cursor-pointer">
                      i
                    </div>
                    <span className="important display-on-hover absolute top-0 lg:top-[5px] left-[120px] lg:left-[150px] left-full ml-3 w-[150px] p-2 text-white mt-[-10px] bg-gray-400 text-xs rounded-lg shadow">
                      Inserisci l'altezza di lavoro in{" "}
                      <span className="font-bold underline">metri</span>.
                    </span>
                  </div>
                  <input
                    className={inputStyle("altezzaLavoro")}
                    id="altezzaLavoro"
                    type="text"
                    placeholder={"m"}
                    {...register("altezzaLavoro")}
                    onFocus={() => handleFocus("altezzaLavoro")}
                    onBlur={() => handleBlur("altezzaLavoro")}
                    onChange={(e) => checkFieldsAltezza(e)}
                  />
                  {altezzaLavoroError && (
                    <div className="flex items-center justify-center text-xs text-red-600 bg-red-200 rounded-sm mt-[3px]">
                      {" "}
                      {altezzaLavoroError}{" "}
                    </div>
                  )}
                </div>
                <div className="flex flex-row w-full space-x-[30px] mb-6">
                  <div className="w-1/2">
                    <label
                      className="block  text-textSettings text-sm lg:text-base font-semibold mb-2"
                      htmlFor="portata"
                    >
                      Portata massima
                    </label>
                    <input
                      className={inputStyle("portata")}
                      id="portata"
                      type="text"
                      placeholder={"kg"}
                      {...register("portata")}
                      onFocus={() => handleFocus("portata")}
                      onBlur={() => handleBlur("portata")}
                    />
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-row items-center relative">
                      <label
                        className="block text-textSettings text-sm lg:text-base font-semibold mb-2"
                        htmlFor="dimensioneCarro"
                      >
                        Dimensione carro
                      </label>
                      <div className="flex hoverable-button justify-center items-center w-[13px] h-[13px] ml-1 mb-2 rounded-full bg-gray-200 text-xs leading-none cursor-pointer">
                        i
                      </div>
                      <span className="z-10 display-on-hover absolute top-[-45px] left-[20px] lg:top-0 lg:left-[150px] ml-2 text-center w-[140px] lg:w-[160px] p-2 text-white mt-[-10px] bg-gray-400 text-xs rounded-lg shadow">
                        Inserisci le dimensioni in metri separate da{" "}
                        <span className="font-bold underline">x</span>
                      </span>
                    </div>
                    <input
                      className={inputStyle("dimensioneCarro")}
                      id="dimensioneCarro"
                      type="string"
                      placeholder={"10x10x10 m"}
                      {...register("dimensioneCarro")}
                      onFocus={() => handleFocus("dimensioneCarro")}
                      onBlur={() => handleBlur("dimensioneCarro")}
                    />
                  </div>
                </div>
              </>
            )}

            {categoria === "Autocarri" && (
              <>
                <div className="mb-6">
                  <label
                    className="block text-textSettings text-sm lg:text-base font-semibold mb-2"
                    htmlFor="altezzaLavoro"
                  >
                    Dimensione interna del cassone
                  </label>
                  <input
                    className={inputStyle("altezzaLavoro")}
                    id="altezzaLavoro"
                    type="text"
                    placeholder={"m x m"}
                    {...register("altezzaLavoro")}
                    onFocus={() => handleFocus("altezzaLavoro")}
                    onBlur={() => handleBlur("altezzaLavoro")}
                  />
                </div>
                <div className="flex flex-row w-full space-x-[30px] mb-6">
                  <div className="w-1/2">
                    <label
                      className="block  text-textSettings text-sm lg:text-base font-semibold mb-2"
                      htmlFor="portata"
                    >
                      Portata massima
                    </label>
                    <input
                      className={inputStyle("portata")}
                      id="portata"
                      type="text"
                      placeholder={"kg"}
                      {...register("portata")}
                      onFocus={() => handleFocus("portata")}
                      onBlur={() => handleBlur("portata")}
                    />
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-row items-center relative">
                      <label
                        className="block text-textSettings text-sm lg:text-base font-semibold mb-2"
                        htmlFor="dimensioneCarro"
                      >
                        Dimensione carro
                      </label>
                      <div className="flex hoverable-button justify-center items-center w-[13px] h-[13px] ml-1 mb-2 rounded-full bg-gray-200 text-xs leading-none cursor-pointer">
                        i
                      </div>
                      <span className="z-10 display-on-hover absolute top-0 left-[130px] lg:left-[150px] ml-2 text-center w-[105px] lg:w-[160px] p-2 text-white mt-[-10px] bg-gray-400 text-xs rounded-lg shadow">
                        Inserisci le dimensioni in metri separate da{" "}
                        <span className="font-bold underline">x</span>
                      </span>
                    </div>
                    <input
                      className={inputStyle("dimensioneCarro")}
                      id="dimensioneCarro"
                      type="string"
                      placeholder={"10x10x10 m"}
                      {...register("dimensioneCarro")}
                      onFocus={() => handleFocus("dimensioneCarro")}
                      onBlur={() => handleBlur("dimensioneCarro")}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-6">
              <label
                className="block  text-textSettings text-sm lg:text-base font-semibold mb-2"
                htmlFor="descrizione"
              >
                Descrizione*
              </label>
              <input
                className={inputStyle("descrizione")}
                id="descrizione"
                type="text"
                placeholder={"Scrivi una breve descrizione"}
                {...register("descrizione")}
                onFocus={() => handleFocus("descrizione")}
                onBlur={() => handleBlur("descrizione")}
              />
            </div>
            <div className="mb-[10px]">
              {" "}
              Per Aggiungere o rimuovere campi personalizzati, clicca sui
              pulsanti
            </div>
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex flex-row space-x-[10px]">
                  <input
                    className={inputStyle(`customFields.${index}.name`)}
                    {...register(`customFields.${index}.name`)}
                    placeholder="Nome del campo"
                    onFocus={() => handleFocus(`customFields.${index}.name`)}
                    onBlur={() => handleBlur(`customFields.${index}.name`)}
                  />
                  <input
                    className={inputStyle(`customFields.${index}.value`)}
                    {...register(`customFields.${index}.value`)}
                    placeholder="Descrizione"
                    onFocus={() => handleFocus(`customFields.${index}.value`)}
                    onBlur={() => handleBlur(`customFields.${index}.value`)}
                  />
                </div>
                <div className="flex justify-end mt-[5px] mb-[10px]">
                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white text-sm rounded-lg p-[2px] flex items-center justify-center"
                    onClick={() => remove(index)}
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                onClick={() =>
                  append({ id: fields.length.toString(), name: "", value: "" })
                }
                className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full flex items-center justify-center h-8 w-8"
              >
                +
              </button>
              <div className="flex-1 flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm lg:text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={checkBtn()}
                >
                  Aggiungi
                </button>
              </div>
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

export default aggiungiMacchinario;
