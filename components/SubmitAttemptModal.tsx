import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Atomic/Dropdown";
import Input from "./Atomic/Input";
import Modal from "./Atomic/Modal";
import Toggle from "./Atomic/Toggle";
import * as yup from "yup";
import { addTagForUser } from "../redux/auth/actions.auth";
import { createSubmission } from "../redux/submission/actions.submission";

interface SubmitAttemptModalProps {
  isShowing: boolean;
  toggle: () => void;
  list: string;
  link: string;
}

const SubmitAttemptModal = ({
  isShowing,
  toggle,
  list,
  link,
}: SubmitAttemptModalProps) => {
  const dispatch = useDispatch();
  const { user, addTagError } = useSelector((state: any) => state.auth);
  const [formData, setFormData] = useState<any>({ reviewAgain: false });
  const [errors, setErrors] = useState<any>({});

  const handleCreateSubmission = async () => {
    const createSubmissionValidator = yup.object().shape({
      link: yup.string().required(),
      list: yup.string().required(),
      tag: yup.array().min(1).of(yup.string()),
      remark: yup.string().min(8).max(200).required("Remark is required"),
      score: yup
        .number()
        .min(0)
        .max(10, "Score should be 10 at max")
        .required("Score is required"),
    });

    const payload = {
      list,
      link,
      ...formData,
    };

    try {
      await createSubmissionValidator.validate(payload);
      setErrors({});
    } catch (error: any) {
      console.log(error);
      setErrors({
        [error.path]: error.message,
      });
      return;
    }

    dispatch(createSubmission(payload));
  };

  const handleTagAddition = (value: string) => {
    dispatch(
      addTagForUser({
        name: value,
        color: "#ece",
      })
    );
  };

  return (
    <Modal
      show={isShowing}
      title="Submit attempt"
      subtitle="🎉 consistency is key"
      primaryBtn={{ title: "Save", onClick: () => handleCreateSubmission() }}
      closeBtn={{ title: "Cancel", onClick: () => toggle() }}
      onClose={() => toggle()}
      errorMessage={addTagError?.message}
    >
      <div>
        <Input
          label="Score"
          type="number"
          name="score"
          placeholder="Score yourself out of 10"
          setFormState={setFormData}
          errorMessage={errors.score}
          required
        />

        <Input
          label="Remark"
          name="remark"
          placeholder="Add a remark"
          type="text"
          rows={4}
          setFormState={setFormData}
          errorMessage={errors.remark}
          required
        />

        <Dropdown
          name="tag"
          value={formData.tag}
          defaultValue=""
          label="Tag"
          isMultiSelect
          list={
            user.tags?.map((item: any) => ({
              ...item,
              title: item.name,
              value: item.name,
            })) ?? []
          }
          setFormState={setFormData}
          enableInput
          onCustomInput={handleTagAddition}
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
