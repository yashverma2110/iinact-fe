import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Layout from "../components/layouts";
import Modal from "../components/Modal";
import { linkRegex, listTypes, listTypesEnum } from "../config/constants";
import * as yup from "yup";
import { createList, getListsByUser } from "../redux/lists/actions.lists";
import { isEmpty } from "lodash";
import Button from "../components/Button";
import Card from "../components/Card";
import LinkItem from "../components/LinkItem";
import { link } from "fs";
import { getStringForListType } from "../config/methods";
import Toggle from "../components/Toggle";

const Lists = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { createdList, usersLists, loading, error } = useSelector(
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
        <div>
          <Button title="Create" onClick={toggleCreateListModal} />

          <div className="grid grid-cols-1 mt-4 md:grid-cols-3 md:gap-2">
            {usersLists.map((list: List) => (
              <Card key={list._id}>
                <div className="text-base flex items-center justify-between text-black md:text-lg">
                  {list.name}
                  <Toggle
                    label="Public"
                    selected={list.public}
                    onChange={() => console.log("changed")}
                  />
                </div>
                <div className="text-xs text-slate-600 md:text-sm">
                  {list.description}
                </div>
                <div className="text-sm mt-2">
                  Resource: <b>{getStringForListType(list.type)}</b>
                </div>
                <div className="flex flex-col bg-slate-100 shadow-inner max-h-52 overflow-y-auto mt-2 p-2">
                  {list.urls.map((link) => (
                    <LinkItem key={link} link={link} />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Create list modal */}
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
