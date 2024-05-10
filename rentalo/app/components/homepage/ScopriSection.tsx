"use client";
import React, { FC, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/app/components/homepage/footer";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import "../../globals.css";
import { useEffect } from "react";
import { motion, useInView, useAnimation, useIsPresent } from "framer-motion";

const ScopriSection: FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h1 className="text-black text-2xl md:text-3xl titlehome font-bold mb-5 text-center pt-[100px] mb-[100px]">
          Scopri le{" "}
          <span className="text-orange-500 hover:text-orange-700 ">
            macchine
          </span>{" "}
          che puoi noleggiare su Rentalo
        </h1>
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-center space-y-[10px] w-[300px] h-[400px]  border border-gray-200 m-5">
              <div className="relative w-9/10 h-[200px] mt-[10px]">
                <div className="absolute inset-0">
                  <Image
                    src="/sollevatori-telescopici.png"
                    alt="Home"
                    fill={true}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center w-9/10 h-[165px] mx-auto">
                <h2 className="text-gray-600 text-lg font-bold text-center pt-2 mt-[10px]">
                  Sollevamento
                </h2>
                <button className="group flex justify-center items-center text-black text-sm rounded-sm font-bold bg-orange-500 py-2 px-4 w-[180px] h-[40px] homebtn mt-[30px]">
                  Scopri
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-center space-y-[10px] w-[300px] h-[400px]  border border-gray-200 m-5">
              <div className="relative w-9/10 h-[200px] mt-[10px]">
                <div className="absolute inset-0">
                  <Image src="/autocarro.png" fill={true} alt="Home" />
                </div>
              </div>
              <div className="flex flex-col items-center w-9/10 h-[165px] mx-auto">
                <h2 className="text-gray-600 text-lg font-bold text-center pt-2 mt-[10px]">
                  Autocarri
                </h2>
                <button className="group flex justify-center items-center text-black text-sm rounded-sm font-bold bg-orange-500 py-2 px-4 w-[180px] h-[40px] homebtn mt-[30px]">
                  Scopri
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-center space-y-[10px] w-[300px] h-[400px]  border border-gray-200 m-5">
              <div className="relative w-9/10 h-[200px] mt-[10px]">
                <div className="absolute inset-0">
                  <Image src="/generatore.png" fill={true} alt="Home" />
                </div>
              </div>
              <div className="flex flex-col items-center w-9/10 h-[165px] mx-auto">
                <h2 className="text-gray-600 text-lg font-bold text-center pt-2 mt-[10px]">
                  Attrezzature
                </h2>
                <button className="group flex justify-center items-center text-black text-sm rounded-sm font-bold bg-orange-500 py-2 px-4 w-[180px] h-[40px] homebtn mt-[30px]">
                  Scopri
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-center space-y-[10px] w-[300px] h-[400px]  border border-gray-200 m-5">
              <div className="relative w-9/10 h-[200px] mt-[10px]">
                <div className="absolute inset-0">
                  <Image src="/movimento-terra.jpg" fill={true} alt="Home" />
                </div>
              </div>
              <div className="flex flex-col items-center w-9/10 h-[165px] mx-auto">
                <h2 className="text-gray-600 text-lg font-bold text-center pt-2 mt-[10px]">
                  Movimento terra
                </h2>
                <button className="group flex justify-center items-center text-black text-sm rounded-sm font-bold bg-orange-500 py-2 px-4 w-[180px] h-[40px] homebtn mt-[30px]">
                  Scopri
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      </motion.div>
    </div>
  );
};

export default ScopriSection;
