import React, { useState } from "react";
import Link from "next/link";
import "../app/globals.css";
import InputField from "@/app/components/authentication/InputField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ToasterProvider from "@/providers/ToasterProvider";
import RecoverPassModal from "@/app/components/authentication/recoverPassModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { ModalForm } from "@/types";

interface IFormLogin {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<IFormLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: IFormLogin) => {
    console.log(data);

    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      console.log(callback);

      if (callback?.ok) {
        toast.success("Logged in!");
        router.push("/");
      } else if (callback?.error) {
        toast.error(callback.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      reset();
    }
  };

  const handleModalSubmit = (data: ModalForm) => {
    // Handle modal form submission
    console.log(data);
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
      <ToasterProvider />
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="gradient1" cx="50%" cy="50%" r="60%">
            <stop offset="10%" style={{ stopColor: "#ffac12" }} />
            <stop offset="90%" style={{ stopColor: "#F97316" }} />
          </radialGradient>
        </defs>
        <path d="M0,0 C50,-10 20,70 0,100 L0,0 Z" fill="url(#gradient1)" />
      </svg>

      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="gradient2" cx="50%" cy="50%" r="60%">
            <stop offset="10%" style={{ stopColor: "#ffac12" }} />
            <stop offset="90%" style={{ stopColor: "#F97316" }} />
          </radialGradient>
        </defs>
        <path
          d="M100,100 C60,90 90,30 100,0 L100,100 Z"
          fill="url(#gradient2)"
        />
      </svg>

      <svg
        className="absolute"
        style={{ top: "25%", right: "37%", transform: "translate(50%, -50%)" }}
        viewBox="0 0 100 100"
        width="100"
        height="100"
      >
        <defs>
          <radialGradient id="gradient3" cx="50%" cy="50%" r="50%">
            <stop offset="10%" style={{ stopColor: "#ffac12" }} />
            <stop offset="90%" style={{ stopColor: "#6225fa" }} />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#gradient3)" />
      </svg>

      <div className="p-8 bg-white rounded-lg shadow-top max-w-md w-full relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-orange-500 text-3xl">Login</h1>
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-800 transition duration-300 ease-in-out"
          >
            Vai alla Home →
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <button
            type="submit"
            className="w-full p-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 mb-4"
          >
            Login
          </button>

          <button
            className="w-full p-2 text-white bg-gray-800 rounded-md hover:bg-blue-900 mb-4 flex items-center justify-center"
            onClick={() =>
              signIn("github", { callbackUrl: `${router.basePath}/dashboard` })
            }
          >
            <FaGithub className="mr-2" />
            Login con GitHub
          </button>
          <button
            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center justify-center"
            onClick={() =>
              signIn("google", { callbackUrl: `${router.basePath}/dashboard` })
            }
          >
            <FaGoogle className="mr-2" />
            Login con Google
          </button>
        </form>
        <div className="flex justify-between mb-1 ">
          <Link
            href="/ScegliUtente"
            className="text-blue-500 hover:text-blue-800 mt-7 inline-block"
          >
            ← Non hai un account?
          </Link>
          <a
            href="#"
            onClick={handleOpenModal}
            className="text-blue-500 hover:text-blue-800 mt-7 inline-block"
          >
            Dimenticato la password? →
          </a>
        </div>
      </div>
      <RecoverPassModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        submitData={handleModalSubmit}
      />
    </div>
  );
};

export default Login;
