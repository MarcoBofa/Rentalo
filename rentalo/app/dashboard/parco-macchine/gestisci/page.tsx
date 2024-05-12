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
      <div className="flex flex-col items-center min-h-screen text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mb-[44px] mt-[50px] lg:mt-[150px] w-full  lg:w-1/2 rounded  p-[10px] lg:p-[35px] bg-white">
          <h1 className="text-lg lg:text-xl font-bold mb-2">
            Gestisci i macchinari della tua azienda
          </h1>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default aggiungiMacchinario;
