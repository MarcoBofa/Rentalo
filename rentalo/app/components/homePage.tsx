import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/footer";

const homePage: FC = () => {
  return (
    <div className="relative">
      <div className="relative">
        <Image
          src="/cantiere-stradale.jpg"
          width={1920}
          height={1080}
          alt="Home"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-70"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-5">
            Noleggia macchinari e attrezzature
          </h1>
          <div className="flex space-x-4">
            <button className="text-black-600 text-xl bg-gray-300 opacity-70 py-2 px-4 rounded-full hover:text-blue-800 mt-10 mr-10">
              Più informazioni
            </button>
            <Link href="/ScegliUtente">
              <button className="text-black-600 text-xl bg-gray-300 opacity-70 py-2 px-4 rounded-full hover:text-blue-800 mt-10">
                Registrati
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-[500px]"></div>
      <div className="relative">
        <Image
          src="/Cantiere-mezzi-lavoro.jpeg"
          alt="Home"
          width={1800}
          height={300}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-70"></div>
      </div>
    </div>
  );
};

export default homePage;
