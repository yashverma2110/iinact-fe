import React, { SetStateAction, useEffect, useState } from "react";

interface ToggleProps {
  selected?: boolean;
  label?: string;
  loading?: boolean;
  name?: string;
  setFormState?: React.Dispatch<SetStateAction<any>>;
  onChange?: (value: boolean) => void;
  classes?: string;
}

const Toggle = ({
  selected = false,
  label,
  onChange,
  loading,
  name,
  setFormState,
  classes = "",
}: ToggleProps) => {
  const [value, setvalue] = useState(selected);

  useEffect(() => {
    setvalue(selected);
  }, [selected]);

  const toggle = () => {
    onChange && onChange(!value);

    if (name && setFormState) {
      setFormState((formdata: any) => ({
        ...formdata,
        [name]: value,
      }));
    }

    setvalue(!value);
  };

  return (
    <div className={"flex items-center " + classes}>
      {label && (
        <label className="mr-2 text-slate-500 text-xs font-semibold md:text-sm">
          {label}
        </label>
      )}
      <div
        className="h-4 w-10 rounded-full bg-slate-200 flex items-center cursor-pointer md:w-10"
        role="radio"
        aria-checked={value}
        onClick={toggle}
      >
        <span
          className={`h-4 w-4 rounded-full transition-all scale-125 md:scale-150 md:mx-1 ${
            value ? "translate-x-6 bg-green-400" : "translate-x-0 bg-slate-500"
          } ${loading ? "animate-pulse" : ""}`}
        ></span>
      </div>
    </div>
  );
};

export default Toggle;
