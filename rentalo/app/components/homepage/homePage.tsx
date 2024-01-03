import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/homepage/footer";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import "../../globals.css";

const homePage: FC = () => {
  return (
    <div className="flex flex-col bg-grey-100">
      <div className="relative">
        <div className="relative w-full h-[800px] lg:h-[850px]">
          <Image
            src="/cantiere-stradale.jpg"
            layout="fill"
            objectFit="cover"
            alt="Home"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-4">
          <h1 className="text-white text-3xl md:text-7xl titlehome font-bold mb-10 text-center">
            BENVENUTO SU RENTALO
          </h1>
          <h2 className="text-white md:text-[22px] font-bold mb-[10px] text-center">
            Vuoi noleggiare o prendere a noleggio una macchina da cantiere?
          </h2>
          <h2 className="text-white md:text-[19px] font-semibold mb-[60px] text-center">
            Scopri Rentalo e noleggia in pochi click anche con operatore.
          </h2>
          <div className="flex flex-row space-x-4">
            <Link href="/richiestaNoleggio">
              <button className="group flex justify-center items-center text-black text-sm lg:text-base rounded-sm font-bold bg-orange-500 py-2 px-4 w-[180px] md:w-[250px] h-[40px] lg:h-[55px] homebtn mr-[60px] lg:mr-[90px]">
                <GoArrowLeft className="transition-transform mr-2 lg:mr-9 group-hover:-translate-x-4 scale-150" />
                Richiedi Noleggio
              </button>
            </Link>
            <Link href="/propostaNoleggio">
              <button className="group flex justify-center items-center text-black text-sm lg:text-base rounded-sm font-bold bg-orange-500 py-2 px-4 w-[180px] md:w-[250px] h-[40px] lg:h-[55px] homebtn">
                Proponi Noleggio
                <GoArrowRight className="transition-transform ml-2 lg:ml-9 group-hover:translate-x-4 scale-150" />
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
