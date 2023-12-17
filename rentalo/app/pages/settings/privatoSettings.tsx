import React from "react";
import "../../globals.css";

interface UserSettingsProps {
  // Define your prop types here
}

const privatoSettings: React.FC<UserSettingsProps> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Impostazioni Privato</h1>
    </div>
  );
};

export default privatoSettings;
