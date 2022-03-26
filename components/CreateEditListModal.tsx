import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createList, editList } from "../redux/lists/actions.lists";
import Input from "./Atomic/Input";
import Modal from "./Atomic/Modal";
import * as yup from "yup";
import { linkRegex, listTypes } from "../config/constants";
import { isEmpty } from "lodash";
import Dropdown from "./Atomic/Dropdown";
import LinkItem from "./Atomic/LinkItem";

interface CreateEditListModalProps {
  isShowing: boolean;
  setIsShowing: () => void;
  edit?: any;
}

const CreateEditListModal = ({
  isShowing,
  setIsShowing,
  edit,
}: CreateEditListModalProps) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.lists);

  const [listFormData, setlistFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isListFormInView, setisListFormInView] = useState(false);
  const [isListEditMode, setisListEditMode] = useState(false);

  useEffect(() => {
    if (!isEmpty(edit)) {
      setlistFormData(edit);
      setisListEditMode(!!edit);
    }
  }, [edit]);

  const handleMutateList = () => {
    const listData = { ...listFormData };
    delete listData.link;

    if (isListEditMode) {
      const listId = listData._id;
      delete listData.createdAt;
      delete listData._id;
      dispatch(editList(listId, listData));
      return;
    }
    dispatch(createList(listData));
  };

  const handleNextClick = async () => {
    const listDetailsValidation = yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup
        .string()
        .min(8)
        .max(200)
        .required("Description is required"),
      type: yup.string().required("Type is required"),
    });

    try {
      await listDetailsValidation.validate(listFormData);
      setErrors({});
    } catch (error: any) {
      setErrors({
        [error.path]: error.message,
      });
      return;
    }

    setisListFormInView(true);
  };

  const handleAddLinkClick = async () => {
    const linkValidation = yup.object().shape({
      link: yup
        .string()
        .test((value) => linkRegex.test(value ?? ""))
        .test({
          message: "This link has already been added",
          test: (value) => !listFormData?.urls?.includes(value),
        }),
    });

    try {
      await linkValidation.validate(listFormData);
      setErrors({});
    } catch (error: any) {
      setErrors({
        [error.path]: error.message,
      });
      return;
    }

    setlistFormData((formData: any) => ({
      ...formData,
      urls: [formData.link, ...(formData.urls ?? [])],
    }));
  };

  return (
    <Modal
      show={isShowing}
      title={isListEditMode ? "Edit your list" : "Create a list"}
      subtitle={
        isListEditMode
          ? ""
          : "Create a playlist of urls that you wish to track, use and share them on the go"
      }
      onClose={setIsShowing}
      primaryBtn={{
        title: isListFormInView ? "Save" : "Next",
        onClick: isListFormInView ? handleMutateList : handleNextClick,
        loading: loading,
      }}
      closeBtn={{
        title: isListFormInView ? "Back" : "Close",
        onClick: isListFormInView
          ? () => setisListFormInView(false)
          : setIsShowing,
      }}
      errorMessage={error}
    >
      <div>
        {isListFormInView ? (
          <div className="flex flex-col">
            <div>
              <div className="flex flex-col mt-2 p-2 shadow-inner bg-slate-100 rounded h-52 max-h-52 overflow-y-auto">
                {listFormData.urls?.map((link: string) => {
                  return <LinkItem key={link} link={link} />;
                })}
              </div>
              <div className="flex h-2 w-6/7">
                <span
                  style={{
                    width: `${listFormData?.urls?.length ?? 0 / 100}%`,
                  }}
                  className="bg-green-300 h-full rounded"
                />
                <span className="ml-auto text-green-300 font-bold text-xs">
                  {listFormData?.urls?.length ?? 0}/100
                </span>
              </div>
            </div>
            <div className="flex items-end">
              <Input
                name="link"
                label="Link"
                type="text"
                placeholder="https://leetcode.com/question"
                setFormState={setlistFormData}
                errorMessage={errors.link}
                required
              />
              <button
                className="m-2 bg-red-400 rounded text-white shadow h-10 px-2 text-sm md:text-base"
                onClick={handleAddLinkClick}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <>
            <Input
              name="name"
              label="Name"
              type="text"
              value={listFormData.name}
              placeholder="Leetcode graphs"
              setFormState={setlistFormData}
              errorMessage={errors.name}
              required
            />
            <Input
              name="description"
              label="Description"
              type="text"
              value={listFormData.description}
              placeholder="An exhaustive list for questions based on graphs, category: easy/medium"
              setFormState={setlistFormData}
              rows={3}
              errorMessage={errors.description}
              required
            />
            <Dropdown
              name="type"
              value={listFormData.type}
              label="Type"
              defaultValue="lc"
              list={listTypes}
              setFormState={setlistFormData}
              forMobile
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default CreateEditListModal;
