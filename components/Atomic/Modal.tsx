import React from "react";
import "../../styles/components/Modal.module.css";
import Button, { ButtonProps } from "./Button";

interface ModalProps {
  title: string;
  subtitle?: string;
  show: boolean;
  onClose: () => void;
  children: any;
  primaryBtn: ButtonProps;
  closeBtn: ButtonProps;
  errorMessage?: string;
}

const Modal = ({
  show,
  title,
  subtitle,
  onClose,
  children,
  primaryBtn,
  closeBtn,
  errorMessage = "",
}: ModalProps) => {
  if (!show) return null;

  return (
    <div className="overlay h-screen w-screen absolute top-0 left-0 flex justify-center md:items-center">
      <div className="modal h-fit bg-white absolute shadow-lg p-4 rounded w-full bottom-0 md:bottom-auto  md:max-w-screen-sm">
        <button
          className="absolute text-sm top-2 right-2 font-bold text-white w-5 h-5 bg-slate-300 flex justify-center items-center rounded-full"
          onClick={onClose}
        >
          x
        </button>
        <div className="text-lg font-bold md:text-xl">{title}</div>
        <div className="text-xs text-slate-600 md:text-sm">{subtitle}</div>
        <hr className="mt-2 border-slate-300" />

        <div className="modal-body">{children}</div>

        {errorMessage && (
          <div className="text-center font-semibold text-red-500 uppercase bg-red-100 rounded border-2 border-red-500 p-2 mt-2 text-sm md:text-base">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-2 gap-1 mt-4">
          <Button type="secondary" {...closeBtn} />
          <Button {...primaryBtn} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
