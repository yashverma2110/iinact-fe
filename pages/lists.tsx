import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Layout from "../components/layouts";
import Modal from "../components/Modal";
import { linkRegex, listTypes } from "../config/constants";
import * as yup from "yup";
import { createList, getListsByUser } from "../redux/lists/actions.lists";
import { isEmpty } from "lodash";
import Button from "../components/Button";

const Lists = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { createdList, loading, error } = useSelector(
    (state: any) => state.lists
  );

  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [listFormData, setlistFormData] = useState<any>({});
  const [isListFormInView, setisListFormInView] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    dispatch(getListsByUser());
  }, [dispatch]);

  const toggleCreateListModal = useCallback(() => {
    setIsCreateListModalOpen(!isCreateListModalOpen);

    setlistFormData({});
    setisListFormInView(false);
  }, [isCreateListModalOpen]);

  //* closes create list modal after list creation is successfull
  useEffect(() => {
    if (!loading && !error && !isEmpty(createdList)) {
      toggleCreateListModal();
    }
  }, [loading, error, createdList, toggleCreateListModal]);

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

  const handleCreateList = () => {
    const createListData = { ...listFormData };
    delete createListData.link;
    dispatch(createList(createListData));
  };

  return (
    <div>
      <Head>
        <title>Lists - iinact</title>
        <meta
          name="description"
          content="Create, edit, share or delete your playlists"
        />
      </Head>

      <Layout>
        <div className="flex">
          <Button title="Create" onClick={toggleCreateListModal} />
          <Modal
            show={isCreateListModalOpen}
            title="Create a list"
            subtitle="Create a playlist of urls that you wish to track, use and share them on the go"
            onClose={toggleCreateListModal}
            primaryBtn={{
              title: isListFormInView ? "Create" : "Next",
              onClick: isListFormInView ? handleCreateList : handleNextClick,
              loading: loading,
            }}
            closeBtn={{
              title: isListFormInView ? "Back" : "Close",
              onClick: isListFormInView
                ? () => setisListFormInView(false)
                : toggleCreateListModal,
            }}
            errorMessage={error}
          >
            <div>
              {isListFormInView ? (
                <div className="flex flex-col">
                  <div>
                    <div className="flex flex-col mt-2 p-2 shadow-inner bg-slate-100 rounded h-40 max-h-40 overflow-y-auto">
                      {listFormData.urls?.map((link: string) => {
                        return (
                          <a
                            className="text-red-400 bg-white shadow rounded-full p-2 my-2 font-semibold text-xs md:text-sm"
                            key={link}
                            href={link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {link}
                          </a>
                        );
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
                    placeholder="Leetcode graphs"
                    setFormState={setlistFormData}
                    errorMessage={errors.name}
                    required
                  />
                  <Input
                    name="description"
                    label="Description"
                    type="text"
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
        </div>
      </Layout>
    </div>
  );
};

export default Lists;
