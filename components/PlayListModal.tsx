import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSchedule } from "../redux/schedule/actions.schedule";
import LinkItem from "./Atomic/LinkItem";
import Modal from "./Atomic/Modal";
import Scheduler from "./Atomic/Scheduler";

interface PlayListModalProps {
  isShowing: boolean;
  setIsShowing: (show: boolean) => void;
  list: List | null;
}

const PlayListModal = ({
  isShowing,
  setIsShowing,
  list,
}: PlayListModalProps) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.schedules);
  const [scheduleFormData, setscheduleFormData] = useState<any>({});

  const handleChange = useCallback((days: string[], time: string) => {
    setscheduleFormData((formData: any) => ({
      ...formData,
      remindAt: time,
      days,
    }));
  }, []);

  const handleCreateSchedule = () => {
    const payload = {
      ...scheduleFormData,
      list: list?._id,
    };
    dispatch(createSchedule(payload));
  };

  return (
    <Modal
      title="Let's get started!"
      show={isShowing}
      onClose={() => setIsShowing(false)}
      primaryBtn={{
        title: "Play",
        loading: loading,
        onClick: () => handleCreateSchedule(),
      }}
      closeBtn={{
        title: "Cancel",
        onClick: () => setIsShowing(false),
      }}
    >
      <div className="mt-2">
        <div className="text-sm md:text-base">
          Name: <b>{list?.name}</b>
        </div>
        <div className="text-sm md:text-base">
          Description: <b>{list?.description}</b>
        </div>
        <div className="flex flex-col p-2 rounded my-2 overflow-y-auto h-40 max-h-40 shadow-inner">
          {list?.urls?.map((link) => (
            <LinkItem link={link} key={link} />
          ))}
        </div>
      </div>

      <div>
        <div>Schedule at:</div>
        <Scheduler onChange={handleChange} />
      </div>
    </Modal>
  );
};

export default PlayListModal;
