"use client";
import React from "react";
import "../app/globals.css";
import InputField from "../app/components/authentication/InputField";
import styles from "../app/stylings/custom.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import ToasterProvider from "../providers/ToasterProvider";
import { IFormInput } from "@/types";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";

const RegistraNoleggiatore: React.FC = () => {
  const [termsBtn, setTermsBtn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      surname: "",
      piva: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "noleggiatore",
    },
  });
  const router = useRouter();

  const onSubmit = (data: IFormInput) => {
    if (data.password && data.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!termsBtn) {
      toast.error("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    axios
      .post("/api/registraNoleggiatore", data)
      .then(() => {
        toast.success("Account creato!");
        router.push("/Login");
      })
      .catch((error) => {
        // Check if the server responded with a message, otherwise use a default message
        const message = error.response?.data?.error || "An error occurred!";
        toast.error(message);
      });

    console.log(data);
    reset();
  };

  return (
    <div className={styles.flex + " h-screen"}>
      <ToasterProvider />
      <div className="w-full lg:w-1/2 bg-white px-8 py-1 lg:p-10 flex lg:items-center justify-center">
        <div className="lg:w-2/3 flex flex-col lg:justify-between">
          <div className="flex justify-between mb-6">
            <Link
              href="/ScegliUtente"
              className="text-orange-400 hover:text-orange-600 mb-10 inline-block"
            >
              ← Utente sbagliato?
            </Link>
            <Link
              href="/Login"
              className="text-orange-400 hover:text-orange-600 mb-10 inline-block"
            >
              Già registrato? →
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-black mb-6">
            Crea il tuo account da noleggiatore!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <InputField
                  label="name"
                  type="text"
                  register={register}
                  watch={watch}
                  required
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label="surname"
                  type="text"
                  register={register}
                  watch={watch}
                  required
                />
              </div>
            </div>
            {/* <div className="mb-4">
              <InputField
                label="Date of Birth"
                datePicker
                onDateChange={handleDateChange}
              />
            </div> */}
            <div className="mb-4">
              <InputField
                label="email"
                type="email"
                register={register}
                watch={watch}
                required
              />
            </div>
            <div className="mb-4">
              <InputField
                label="password"
                type="password"
                register={register}
                watch={watch}
                required
              />
            </div>
            <div className="mb-4">
              <InputField
                label="confirmPassword"
                type="password"
                register={register}
                watch={watch}
                required
              />
            </div>
            <div className="mb-4 pt-7 pb-7 flex items-center">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={termsBtn}
                onChange={() => setTermsBtn(!termsBtn)}
                className="mr-4 text-orange-300 w-6 h-6"
              />
              <label
                htmlFor="termsCheckbox"
                className="text-sm text-black flex-wrap"
              >
                Ho letto e accetto i{" "}
                <Link
                  href="/terms"
                  className="text-orange-400 hover:text-orange-600"
                >
                  Termini di Servizio
                </Link>{" "}
                e le{" "}
                <Link
                  href="/privacy"
                  className="text-orange-400 hover:text-orange-600"
                >
                  Polizze sulla Privacy
                </Link>{" "}
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white p-3 rounded-full font-bold hover:bg-orange-600"
            >
              Crea Account
            </button>
            <button
              className="w-full p-2 text-white bg-gray-800 rounded-full hover:bg-blue-900 mt-4 flex items-center justify-center"
              onClick={() =>
                signIn("github", { callbackUrl: `${router.basePath}/` })
              }
            >
              <FaGithub className="mr-2" />
              Continua con GitHub
            </button>
            <button
              className="w-full p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 mt-4 flex items-center justify-center"
              onClick={() =>
                signIn("google", { callbackUrl: `${router.basePath}/` })
              }
            >
              <FaGoogle className="mr-2" />
              Continua con Google
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2 p-10 flex flex-col items-center justify-center relative bg-black">
        <div className="absolute inset-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="greyGradient"
                x1="0%"
                y1="100%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "rgba(130, 62, 5, 1)" }}
                />
                <stop offset="60%" style={{ stopColor: "rgba(0, 0, 0, 1)" }} />
              </linearGradient>
              <clipPath id="triangleClip">
                <polygon points="0,100 100,0 100,100" />
              </clipPath>
            </defs>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="url(#greyGradient)"
              clipPath="url(#triangleClip)"
            />
          </svg>
        </div>

        <div className="text-center z-10 mt-20 flex flex-col justify-center">
          <div className="mb-40 flex items-start justify-center">
            <span className="text-orange-500 border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
              <i className="fas fa-check"></i>
            </span>
            <div className="text-center">
              <h2 className="text-3xl text-orange-500 font-bold mb-3">
                Crea il tuo account in pochi minuti!
              </h2>
              <p className="text-md text-white">
                registrazione facile e veloce
              </p>
            </div>
          </div>
          <div className="mb-40 flex items-start justify-center">
            <span className="text-orange-500 border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
              <i className="fas fa-check"></i>
            </span>
            <div className="text-center">
              <h2 className="text-3xl text-orange-500 font-bold mb-3">
                Noleggia quello che ti serve
              </h2>
              <p className="text-md text-white">
                Trova tutti i macchinari e le attrezzature di cui hai bisogno
              </p>
            </div>
          </div>
          <div className="mb-40 flex items-start justify-center">
            <span className="text-orange-500 border border-orange-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
              <i className="fas fa-check"></i>
            </span>
            <div className="text-center">
              <h2 className="text-3xl text-orange-500 font-bold mb-3">
                Gestione facile e pratica
              </h2>
              <p className="text-md text-white">
                Gestisci comodamente noleggi e annunci dalla piattaforma
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistraNoleggiatore;
