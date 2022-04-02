import React from "react";
import { FaSpinner } from "react-icons/fa";

export interface ButtonProps {
  title: String;
  type?: "primary" | "secondary";
  classes?: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  title,
  type = "primary",
  classes = "",
  onClick,
  loading = false,
  disabled = false,
  icon,
}: ButtonProps) => {
  return (
    <button
      className={`${classes} ${disabled || loading ? "bg-gray-300" : ""} ${
        type === "primary" ? "bg-red-400" : "bg-slate-300"
      } rounded text-white flex justify-center items-center shadow p-2 text-xs md:text-lg`}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : icon ? (
        <>
          <span className="block md:hidden">{icon}</span>
          <span className="hidden md:block">{title}</span>
        </>
      ) : (
        <span>{title}</span>
      )}
    </button>
  );
};

export default Button;
