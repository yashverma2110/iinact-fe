import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCaretDown, FaTimesCircle } from "react-icons/fa";

type listItem = {
  title: string;
  description?: string;
  value: string;
  color?: string;
};

type dropdownValue = any;
interface DropdownProps {
  label: string;
  name: string;
  value: dropdownValue;
  list: listItem[];
  defaultValue: string;
  classes?: string;
  setFormState: Dispatch<SetStateAction<any>>;
  direction?: "bottom" | "top";
  forMobile?: boolean;
  isMultiSelect?: boolean;
  enableInput?: boolean;
  onCustomInput?: (value: string) => void;
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
  isMultiSelect = false,
  enableInput = true,
  onCustomInput = () => {},
}: DropdownProps) => {
  const [isDropdownCollapsed, setisDropdownCollapsed] = useState(true);

  useEffect(() => {
    setFormState((formState: any) => ({
      ...formState,
      [name]: defaultValue,
    }));
  }, [defaultValue, name, setFormState]);

  const getListItemForValue = (value: any) => {
    for (const item of list) if (item.value === value) return item;

    return null;
  };

  const toggleDropdown = () => {
    setisDropdownCollapsed(!isDropdownCollapsed);
  };

  const setOption = (
    listEle: listItem | string,
    isRemoved: boolean = false
  ) => {
    let item = typeof listEle === "string" ? listEle : listEle.value;
    let valueToSet: any = item;

    if (isMultiSelect) {
      if (!Array.isArray(valueToSet)) {
        valueToSet = Array.isArray(value) ? value : [];
      }

      if (isRemoved) {
        valueToSet = valueToSet.filter((value: any) => value !== item);
      } else {
        valueToSet.push(item);
      }
    }

    setFormState((formState: any) => ({
      ...formState,
      [name]: valueToSet,
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
            " w-full flex items-center bg-slate-100 p-3 rounded-full show-inner text-sm tracking-tight font-semibold"
          }
          onClick={toggleDropdown}
        >
          {isMultiSelect
            ? null
            : getListItemForValue(value ?? defaultValue)?.title}
          {isMultiSelect ? (
            <div
              className="flex items-center flex-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              {Array.isArray(value)
                ? value.map((item: any, eleIndex: number) => (
                    <div
                      className="flex items-center bg-red-400 capitalize p-2 mx-1 text-white font-bold rounded-lg"
                      style={{ background: getListItemForValue(item)?.color }}
                      key={item + "-" + eleIndex}
                    >
                      {getListItemForValue(item)?.title}
                      <button
                        className="ml-1"
                        onClick={() => {
                          setOption(item, true);
                        }}
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  ))
                : null}
            </div>
          ) : null}
          {enableInput ? (
            <input
              type="text"
              placeholder="Press enter to add"
              className=" rounded-md p-2"
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  onCustomInput(e.target.value);
                }
              }}
            />
          ) : (
            <></>
          )}
          <div className="ml-auto" onClick={toggleDropdown}>
            <FaCaretDown />
          </div>
        </button>
        <div
          className={`absolute z-s-max ${
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
          {list.map((item, index) => (
            <button
              key={item.value + "-" + index}
              className={`w-full capitalize py-2 px-4 shadow-lg text-left text-sm border-b border-b-slate-200 hover:bg-slate-100 bg-white`}
              onClick={() => setOption(item)}
              disabled={
                isMultiSelect && Array.isArray(value)
                  ? value.includes(item.value)
                  : value === item.value
              }
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
