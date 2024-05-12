"use client";
import DashboardLayout from "@/app/layout/dashboardLayout";
import { useContext, useEffect, useState } from "react";
import UserContext from "@/app/context/useContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const macchinariNoleggiati: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center h-full text-textSettings bg-settings py-2 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center mt-[155px] lg:mt-[200px]  w-full lg:w-1/2 rounded h-[350px] p-[10px] lg:p-[40px] bg-white">
          <h1 className="text-xl font-bold mb-2">I tuoi noleggi</h1>
          <h2 className="text-md mb-10 ">
            Gestisci comodamente i macchinari da te noleggiati
          </h2>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default macchinariNoleggiati;
