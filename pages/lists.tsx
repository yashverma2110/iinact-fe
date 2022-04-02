import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Atomic/layouts";
import { getListsByUser } from "../redux/lists/actions.lists";
import Button from "../components/Atomic/Button";
import Card from "../components/Atomic/Card";
import LinkItem from "../components/Atomic/LinkItem";
import { getStringForListType, getUser } from "../config/methods";
import Toggle from "../components/Atomic/Toggle";
import ListCardLoading from "../components/Loading/ListCardLoading";
import CreateEditListModal from "../components/CreateEditListModal";
import ScheduleListModal from "../components/PlayListModal";

const Lists = () => {
  const dispatch = useDispatch();
  const { listLoading, usersLists } = useSelector((state: any) => state.lists);

  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [isPlayListModalShowing, setisPlayListModalShowing] = useState(false);
  const [listEditFormData, setlistEditFormData] = useState<any>({});
  const [listToPlay, setlistToPlay] = useState<List | null>(null);

  useEffect(() => {
    dispatch(getListsByUser());
  }, [dispatch]);

  const toggleCreateListModal = useCallback(() => {
    setIsCreateListModalOpen(!isCreateListModalOpen);
  }, [isCreateListModalOpen]);

  const handleEditList = (list: List) => {
    setlistEditFormData(list);
    setIsCreateListModalOpen(true);
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

          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {listLoading &&
              [...Array(4)].map((item, index) => (
                <ListCardLoading key={index} />
              ))}

            {usersLists.map((list: List) => (
              <Card key={list._id + list.updatedAt}>
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
                <div
                  className={`flex my-4 ${
                    false ? "justify-evenly" : "justify-center"
                  }`}
                >
                  {getUser()._id === list.user && (
                    <Button
                      classes="w-full mr-1"
                      title="Edit"
                      onClick={() => handleEditList(list)}
                    />
                  )}
                  <Button
                    classes="w-full ml-1"
                    title="Play"
                    onClick={() => {
                      setlistToPlay(list);
                      setisPlayListModalShowing(true);
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>

          <CreateEditListModal
            isShowing={isCreateListModalOpen}
            setIsShowing={toggleCreateListModal}
            edit={listEditFormData}
          />
          <ScheduleListModal
            list={listToPlay}
            isShowing={isPlayListModalShowing}
            setIsShowing={(show: boolean) => setisPlayListModalShowing(show)}
          />
        </div>
      </Layout>
    </div>
  );
};

export default Lists;
