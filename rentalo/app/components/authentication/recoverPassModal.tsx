"use client";
import "../../globals.css";
import React, { FormEvent, FC } from "react";
import { ModalForm } from "@/types";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ToasterProvider from "../../../providers/ToasterProvider";
import axios from "axios";

interface RecoverPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitData: (data: ModalForm) => void;
}

const RecoverPassModal: FC<RecoverPassModalProps> = ({
  isOpen,
  onClose,
  submitData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ModalForm>({
    defaultValues: {
      email: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: ModalForm) => {
    console.log("data", data);
    axios
      .post("/api/resetPasswordEmail", data)
      .then(() => {
        toast.success(
          "Se l'email inserita è associata ad un account, riceverai una mail con le istruzioni per il reset della password.",
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
        reset();
        return;
      });

    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
      <ToasterProvider></ToasterProvider>
      <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className=" absolute top-1 right-1 bg-red-500 text-white py-1 px-3 rounded-full text-sm "
        >
          Chiudi
        </button>
        <h2 className="text-2xl mb-6 text-orange-600 ">
          Password dimenticata?
        </h2>
        <span className="text-gray-500 mb-6 block">
          Inserisci l'email associata al tuo account per ricevere le istruzioni
          per il reset della password.
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <InputField
              label="email"
              type="email"
              register={register}
              required
              watch={watch}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xl py-4 px-4 rounded-md"
          >
            Invia
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassModal;
