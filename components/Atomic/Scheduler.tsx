import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { daysInAWeek } from "../../config/constants";
import Input from "./Input";

interface SchedulerProps {
  onChange: (days: string[], time: string) => void;
}

const Scheduler = ({ onChange }: SchedulerProps) => {
  const [daysToRemind, setDaysToRemind] = useState(daysInAWeek);
  const [scheduleTime, setScheduleTime] = useState(dayjs().format("hh:mm A"));

  useEffect(() => {
    onChange(daysToRemind, scheduleTime);
  }, [daysToRemind, scheduleTime, onChange]);

  const toggleDay = (day: string) => {
    if (daysToRemind.includes(day)) {
      setDaysToRemind(daysToRemind.filter((d) => d !== day));
      return;
    }

    setDaysToRemind([...daysToRemind, day]);
  };

  return (
    <div>
      <div className="flex justify-evenly">
        {daysInAWeek.map((day) => (
          <button
            className={`text-sm h-8 w-8 rounded-full shadow ${
              daysToRemind.includes(day) ? "bg-red-400" : "bg-slate-400"
            } text-bold text-white`}
            key={day}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <Input
        name="time"
        type="time"
        placeholder={dayjs().format("HH:MM:ss")}
        value={dayjs().format("HH:mm")}
        onChange={(value) => setScheduleTime(value)}
      />
    </div>
  );
};

export default Scheduler;
