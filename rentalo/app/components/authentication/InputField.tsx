import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Path, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { IFormInput } from "@/types";

interface InputFieldProps {
  label: Path<IFormInput>;
  type?: string;
  datePicker?: boolean;
  register: UseFormRegister<IFormInput>;
  required: boolean;
  watch: (name: string) => any;
  setValue?: UseFormSetValue<IFormInput>;
  onDateChange?: (date: Date | null) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  required,
  watch,
  datePicker,
  setValue,
  onDateChange,
}) => {
  const [focused, setFocused] = useState(false);
  const value = watch(label);

  const formatLabel = (label: string) => {
    const l = label.charAt(0).toUpperCase() + label.slice(1);
    const customLabels: { [key: string]: string } = {
      Name: "Nome",
      Surname: "Cognome",
      Piva: "Partita IVA",
      ConfirmPassword: "Confirm Password",
      BirthDate: "Data di Nascita",
    };
    return customLabels[l] || l;
  };

  if (datePicker) {
    return (
      <div className="relative">
        <DatePicker
          wrapperClassName="w-full"
          selected={value ? new Date(value) : null}
          onChange={(date) => {
            const formattedDate = date ? date.toISOString().split("T")[0] : "";
            if (setValue) {
              setValue(label, formattedDate);
            }
            if (onDateChange) {
              onDateChange(date);
            }
          }}
          className={`w-full border p-4 text-black rounded transition-all duration-200 ${
            focused || value ? "border-orange-500 border-3" : "border-gray-300"
          } outline-none`}
          dateFormat="yyyy-MM-dd"
          showYearDropdown
          dropdownMode="select" // This enables a dropdown for year selection
          yearDropdownItemNumber={100} // Adjust the number of years to display, if needed
          scrollableYearDropdown
        />

        <label
          className={`absolute left-2 px-1 text-gray-700 transition-all duration-200 ${
            focused || value
              ? "text-xs top-[-8px] text-orange-500"
              : "text-md top-4"
          } ${
            focused || value ? "bg-white" : "bg-transparent"
          } py-[2px] pointer-events-none`}
        >
          {formatLabel(label)}
        </label>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        {...register(label, { required })}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full border p-4 text-black rounded transition-all duration-200 ${
          focused || value ? "border-orange-500 border-3" : "border-gray-300"
        } outline-none`}
      />
      <label
        htmlFor={label}
        className={`absolute left-2 px-1 text-gray-700 transition-all duration-200 ${
          focused || value
            ? "text-xs top-[-8px] text-orange-500"
            : "text-md top-4"
        } ${
          focused || value ? "bg-white" : "bg-transparent"
        } py-[2px] pointer-events-none`}
      >
        {formatLabel(label)}
      </label>
    </div>
  );
};

export default InputField;
