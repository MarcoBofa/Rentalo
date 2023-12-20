import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/footer";
import "../globals.css";
import InfoForm from "./homepage/infoForm";

const homePage: FC = () => {
  return (
    <div className="flex flex-col bg-grey-100">
      <div className="relative">
        <div className="relative w-full h-[1000px] md:h-[850px]">
          <Image
            src="/cantiere-stradale.jpg"
            layout="fill"
            objectFit="cover"
            alt="Home"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-4">
          <h1 className="text-white text-2xl md:text-7xl titlehome font-bold mb-10 text-center">
            BENVENUTO SU RENTALO
          </h1>
          <h2 className="text-white md:text-1xl font-bold mb-[60px] text-center">
            Noleggia tutti i macchinari da cantiere di cui hai bisogno in pochi
            click!
          </h2>
          <div className="flex flex-row ">
            <Link href="/richiestaNoleggio">
              <button className="text-black text-sm lg:text-base rounded-sm font-bold bg-orange-500 py-2 px-4 w-[150px] md:w-[250px] h-[40px] lg:h-[55px] homebtn mr-[90px]">
                Richiedi Noleggio
              </button>
            </Link>
            <Link href="/ScegliUtente">
              <button className="text-black text-sm lg:text-base rounded-sm font-bold bg-orange-500 py-2 px-4 w-[150px] md:w-[250px] h-[55px] homebtn">
                Registrati
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white h-[500px] w-full">
        <h1 className="text-black text-2xl md:text-5xl titlehome font-bold mb-5 text-center pt-10">
          DA DEFINIRE
        </h1>
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
