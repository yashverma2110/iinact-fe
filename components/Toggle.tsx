import React, { useEffect, useState } from 'react';

interface ToggleProps {
  name: string;
  onChange: (value: boolean) => void;
  defaultValue?: boolean;
}

const Toggle = ({ name, onChange, defaultValue = false }: ToggleProps) => {
  const [isOn, setIsOn] = useState<boolean | null>(null);

  useEffect(() => {
    if (isOn !== null) {
      return;
    }

    setIsOn(defaultValue);
    onChange(defaultValue);
  }, [defaultValue, onChange, isOn]);

  const handleInput = () => {
    onChange(!isOn);
    setIsOn(!isOn);
  };

  return (
    <button
      className="flex items-center w-10 h-4 shadow-inner bg-slate-200 rounded-lg"
      onClick={handleInput}
    >
      <div
        className={`transform transition-transform ${
          isOn ? 'translate-x-6' : 'translate-x-0'
        } h-5 w-5 rounded-full bg-purple-500 shadow-lg`}
      ></div>
    </button>
  );
};

export default Toggle;
