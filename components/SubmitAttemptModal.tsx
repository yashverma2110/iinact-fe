import React from "react";
import Modal from "./Atomic/Modal";

interface SubmitAttemptModalProps {
  isShowing: boolean;
  toggle: () => void;
}

const SubmitAttemptModal = ({ isShowing, toggle }: SubmitAttemptModalProps) => {
  return (
    <Modal
      show={isShowing}
      title="Submit attempt"
      subtitle="🎉 consistency is key"
      primaryBtn={{ title: "Save", onClick: () => "suubmit" }}
      closeBtn={{ title: "Cancel", onClick: () => toggle() }}
      onClose={() => toggle()}
    >
      <div></div>
    </Modal>
  );
};

export default SubmitAttemptModal;
