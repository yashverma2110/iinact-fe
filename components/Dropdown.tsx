import { list } from "postcss";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

type listItem = {
  title: string;
  description?: string;
  value: string;
};
interface DropdownProps {
  label: string;
  name: string;
  value: string | undefined;
  list: listItem[];
  defaultValue: string;
  classes?: string;
  setFormState: Dispatch<SetStateAction<any>>;
  direction?: "bottom" | "top";
  forMobile?: boolean;
}

const Dropdown = ({
  name,
  label,
  list,
  defaultValue,
  classes = "",
  setFormState,
  value,
  direction = "bottom",
  forMobile = false,
}: DropdownProps) => {
  const [isDropdownCollapsed, setisDropdownCollapsed] = useState(true);

  useEffect(() => {
    setFormState((formState: any) => ({
      ...formState,
      [name]: defaultValue,
    }));
  }, [defaultValue, name, setFormState]);

  const getListItemForValue = (value: string) => {
    for (const item of list) if (item.value === value) return item;

    return null;
  };

  const toggleDropdown = () => {
    setisDropdownCollapsed(!isDropdownCollapsed);
  };

  const setOption = (item: listItem) => {
    setFormState((formState: any) => ({
      ...formState,
      [name]: item.value,
    }));

    toggleDropdown();
  };

  return (
    <div className="px-2">
      <div className="mb-2 text-slate-600 font-semibold md:text-lg">
        {label}
      </div>

      <div className="relative">
        <button
          className={
            classes +
            " w-full flex items-center bg-slate-100 p-4 rounded-full show-inner text-sm tracking-tight font-semibold"
          }
          onClick={toggleDropdown}
        >
          {getListItemForValue(value ?? defaultValue)?.title}
          <div className="ml-auto" onClick={toggleDropdown}>
            <FaCaretDown />
          </div>
        </button>
        <div
          className={`absolute ${
            direction === "bottom"
              ? `${
                  forMobile
                    ? "origin-bottom bottom-full md:origin-top md:top-full"
                    : "top-full"
                }`
              : "bottom-full"
          } flex flex-col w-full px-4 transition-all origin-top rounded h-28 max-h-30 overflow-y-auto ${
            isDropdownCollapsed ? "scale-y-0" : "scale-y-100"
          }`}
        >
          {list.map((item) => (
            <button
              key={item.value}
              className="w-full py-2 px-4 bg-white shadow-lg text-left text-sm border-b border-b-slate-200 hover:bg-slate-100"
              onClick={() => setOption(item)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
