import React, { Dispatch, SetStateAction, useState } from "react";
import { string } from "yup";

interface InputProps {
  label?: string;
  name: string;
  required?: boolean;
  type: "text" | "number" | "password";
  placeholder: string;
  classes?: string;
  parentClasses?: string;
  errorMessage?: string;
  setFormState: Dispatch<SetStateAction<any>>;
}

const Input = ({
  name,
  type,
  classes = "",
  required = false,
  parentClasses = "",
  label,
  placeholder,
  errorMessage,
  setFormState,
}: InputProps) => {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  return (
    <div className={parentClasses + " flex flex-col p-2 w-full"}>
      {label && (
        <label className="my-2 text-slate-600 text-lg font-semibold">
          {label}{" "}
          {required && (
            <span className="text-red-400 text-sm align-text-top">*</span>
          )}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          className={
            classes +
            "bg-slate-100 p-2 rounded-full shadow-inner w-full text-sm tracking-tight font-semibold"
          }
          name={name}
          type={isPasswordShowing ? "text" : type}
          placeholder={placeholder}
          onChange={(e) =>
            setFormState((formState: any) => ({
              ...formState,
              [name]: e.target.value,
            }))
          }
        />
        {errorMessage && (
          <div className="text-xs text-red-400 font-semibold ml-1 mt-1">
            {errorMessage}
          </div>
        )}
        {type === "password" && (
          <button
            className="absolute right-4 top-2"
            onClick={() => setIsPasswordShowing(!isPasswordShowing)}
          >
            <i
              className={isPasswordShowing ? "far fa-eye" : "far fa-eye-slash"}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
