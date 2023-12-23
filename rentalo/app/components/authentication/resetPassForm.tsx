"use client";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import "../../globals.css";
import ToasterProvider from "@/providers/ToasterProvider";
import toast from "react-hot-toast";
import { safeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";

interface resetPasswordData {
  password: string;
  confirmPassword: string;
}

type FocusedState = {
  [key: string]: boolean;
};

interface ResetPassFormProps {
  user: safeUser;
}

const ResetPassForm: React.FC<ResetPassFormProps> = ({ user }) => {
  const [focused, setFocused] = useState<FocusedState>({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<resetPasswordData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Watch all form fields
  const watchedFields = watch();

  const router = useRouter();

  const handleFocus = (field: string) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocused({ ...focused, [field]: false });
  };

  const onSubmit = (data: resetPasswordData) => {
    if (!data.password || !data.confirmPassword) {
      toast.error("Inserire la Password e la Conferma Password.");
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Le password non corrispondono.");
    }

    const resetData = {
      user: user,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    axios
      .post("/api/rsPass", resetData)
      .then(() => {
        toast.success("Password modificata!");
      })
      .catch((error) => {
        // Check if the server responded with a message, otherwise use a default message
        const message =
          error.response?.data?.error || "Si è verificato un errore";
        toast.error(message);
      });

    router.push("/Login");

    reset();
  };

  const inputStyle = (field: keyof resetPasswordData) => {
    const fieldValue = watchedFields[field as keyof resetPasswordData];
    return `shadow appearance-none border ${
      focused[field] || fieldValue ? "border-orange-500" : "border-gray-300"
    } rounded w-full mb-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ToasterProvider />
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Inserisci la nuova password
        </h2>
        <form
          className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Nuova Password
              </label>
              <input
                className={inputStyle("password")}
                id="password"
                type="password"
                placeholder="Nuova Password"
                {...register("password")}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
              />
            </div>
            <div className="w-full px-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Conferma Password
              </label>
              <input
                className={inputStyle("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="Conferma Password"
                {...register("confirmPassword")}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
              />
            </div>
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

export default ResetPassForm;
