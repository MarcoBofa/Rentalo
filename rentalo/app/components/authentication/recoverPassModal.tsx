"use client";
import "../globals.css";
import React, { FormEvent, FC } from "react";
import { ModalForm } from "@/types";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ToasterProvider from "../../../providers/ToasterProvider";

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
    toast.success(
      "If the Email is valid, you will receive a link to reset your password! :)",
      {
        duration: 5000,
      }
    );
    console.log(data);
    submitData(data);
    reset();
  };
  //   const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();

  //     const formData = new FormData(event.currentTarget);
  //     const data: ModalForm = {
  //       password: formData.get("password") as string,
  //       confirmPassword: formData.get("confirmPassword") as string,
  //     };

  //     onSubmit(data);
  //   };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <ToasterProvider></ToasterProvider>
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-1 px-3 rounded-full text-sm absolute top-4 right-4"
        >
          Close
        </button>
        <h2 className="text-2xl mb-6 text-orange-600 ">
          Forgot your password?
        </h2>
        <span className="text-gray-500 mb-6 block">
          Enter your email address and we will send you a link to reset your
          password.
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassModal;
