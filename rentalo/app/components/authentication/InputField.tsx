"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Path, useForm, UseFormRegister } from "react-hook-form";
import { IFormInput } from "@/types";

interface InputFieldProps {
  label: Path<IFormInput>;
  type?: string;
  datePicker?: boolean;
  register: UseFormRegister<IFormInput>;
  required: boolean;
  watch: (name: string) => any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  datePicker,
  register,
  required,
  watch,
}) => {
  const [focused, setFocused] = useState(false);
  //const [value, setValue] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const value = watch(label); // providing an empty string as default value

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  // };

  const formatLabel = (label: string) => {
    const l = label.charAt(0).toUpperCase() + label.slice(1);
    if (l === "ConfirmPassword") {
      return "Confirm Password";
    }
    return l;
  };

  if (datePicker) {
    return (
      <div className="relative">
        <DatePicker
          selected={dateOfBirth}
          onChange={(date: Date) => setDateOfBirth(date)}
          dateFormat="dd/MM/yyyy"
          className={`w-full border p-4 rounded transition-all duration-200 outline-none ${
            focused ? "border-orange-500 border-3" : "border-gray-300"
          }`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxDate={new Date()}
          showYearDropdown
          showMonthDropdown
        />
        <label
          htmlFor={label}
          className={`absolute left-2 px-1 text-gray-700 transition-all duration-200 ${
            focused || dateOfBirth
              ? "text-xs top-[-8px] border-orange-500 text-orange-500"
              : "text-md top-4"
          } ${
            focused || dateOfBirth ? "bg-white" : "bg-transparent"
          } py-[2px] pointer-events-none`}
          style={{
            zIndex: focused || dateOfBirth ? 1 : "auto",
          }}
        >
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type={type}
        value={watch(label)}
        {...register(label, { required })}
        className={`w-full border p-4 rounded transition-all duration-200 ${
          focused || value ? "border-orange-500 border-3" : "border-gray-300"
        } outline-none`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        htmlFor={formatLabel(label)}
        className={`absolute left-2 px-1 text-gray-700 transition-all duration-200 ${
          focused || value
            ? "text-xs top-[-8px] text-orange-500"
            : "text-md top-4"
        } ${
          focused || value ? "bg-white" : "bg-transparent"
        } py-[2px] pointer-events-none`}
        style={{
          zIndex: focused || value ? 1 : "auto",
        }}
      >
        {formatLabel(label)}
      </label>
    </div>
  );
};

export default InputField;
