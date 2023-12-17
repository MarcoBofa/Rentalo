import React from "react";
import ImpostazioniLayout from "@/app/layout/impostazioniLayout";

const DefaultImpostazioniPage: React.FC = () => {
  return (
    <ImpostazioniLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        BASE IMPOSTAZIONI
      </div>
    </ImpostazioniLayout>
  );
};

export default DefaultImpostazioniPage;
