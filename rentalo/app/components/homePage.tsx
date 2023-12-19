import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/footer";
import "../globals.css";
import InfoForm from "./homepage/infoForm";

const homePage: FC = () => {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Image
          src="/cantiere-stradale.jpg"
          layout="responsive"
          width={1920}
          height={1080}
          alt="Home"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-4">
          <h1 className="text-white sm:text-2xl md:text-7xl titlehome font-bold mb-5 text-center">
            BENVENUTO SU RENTALO
          </h1>
          <h2 className="text-white sm:text-base md:text-1xl font-bold mb-2 text-center">
            Trova tutti i mecchinari di cui hai bisogno e gestisci i tuoi
            annunci comodamente dalla piattaforma
          </h2>
          <div className="mt-10">
            <Link href="/ScegliUtente">
              <button className="text-black bg-orange-500 py-2 px-4 w-[250px] h-[55px] homebtn">
                Registrati
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white w-full p-4">
        <InfoForm />
      </div>

      <div className="relative">
        <Image
          src="/Cantiere-mezzi-lavoro.jpeg"
          layout="responsive"
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
