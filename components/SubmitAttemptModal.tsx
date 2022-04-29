import React, { useState } from "react";
import Dropdown from "./Atomic/Dropdown";
import Input from "./Atomic/Input";
import Modal from "./Atomic/Modal";
import Toggle from "./Atomic/Toggle";

interface SubmitAttemptModalProps {
  isShowing: boolean;
  toggle: () => void;
}

const SubmitAttemptModal = ({ isShowing, toggle }: SubmitAttemptModalProps) => {
  const [formData, setFormData] = useState({});

  return (
    <Modal
      show={isShowing}
      title="Submit attempt"
      subtitle="🎉 consistency is key"
      primaryBtn={{ title: "Save", onClick: () => "suubmit" }}
      closeBtn={{ title: "Cancel", onClick: () => toggle() }}
      onClose={() => toggle()}
    >
      <div>
        <Input
          label="Score"
          type="number"
          name="score"
          placeholder="Score yourself out of 10"
          setFormState={setFormData}
        />

        <Input
          label="Remark"
          name="remark"
          placeholder="Add a remark"
          type="text"
          rows={4}
          setFormState={setFormData}
        />

        <Dropdown
          name="tag"
          value=""
          defaultValue=""
          label="Tag"
          list={[]}
          setFormState={setFormData}
        />

        <Toggle
          classes="px-2 mt-6 justify-between"
          label="Review soon"
          name="reviewAgain"
          setFormState={setFormData}
        />
      </div>
    </Modal>
  );
};

export default SubmitAttemptModal;
