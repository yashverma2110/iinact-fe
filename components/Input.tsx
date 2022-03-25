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
  rows?: number;
  value?: any;
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
  rows = 0,
  value = "",
}: InputProps) => {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  return (
    <div className={parentClasses + " flex flex-col p-2 w-full"}>
      {label && (
        <label className="mb-2 text-slate-600 font-semibold md:text-lg">
          {label}{" "}
          {required && (
            <span className="text-red-400 text-sm align-text-top">*</span>
          )}
        </label>
      )}
      <div className="relative">
        {rows ? (
          <textarea
            id={name}
            rows={rows}
            className={
              classes +
              " w-full bg-slate-100 p-4 rounded-full show-inner text-sm tracking-tight font-semibold"
            }
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) =>
              setFormState((formState: any) => ({
                ...formState,
                [name]: e.target.value,
              }))
            }
          />
        ) : (
          <input
            id={name}
            className={
              classes +
              "bg-slate-100 p-2 rounded-full shadow-inner w-full text-sm tracking-tight font-semibold"
            }
            name={name}
            type={isPasswordShowing ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={(e) =>
              setFormState((formState: any) => ({
                ...formState,
                [name]: e.target.value,
              }))
            }
          />
        )}
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
