import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import ListService from '../services/ListService';
import listActions from '../redux/actions/list.actions';
import Card from '../components/Card';
import ListCreationModal from '../components/Functional/ListCreationModal';

const List: NextPage = () => {
  const dispatch = useDispatch();
  const [isListCreationModalShowing, setIsListCreationModalShowing] =
    useState<boolean>(false);
  const { userOwned = [] } = useSelector((state: any) => state.list);

  useEffect(() => {
    (async () => {
      const { success, data, error } = await ListService.getAll();

      if (success) {
        dispatch(listActions.getAll(data.lists));
      }
    })();
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Lists | IInact</title>
        <meta
          name="description"
          content="Manage your lists, create more awesomeness, track your progress &mp; help others"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className="flex p-4 shadow-lg border-b border-purple-100"
        onClick={() => setIsListCreationModalShowing(true)}
      >
        <button className="ml-auto py-1 px-2 text-white font-semibold bg-purple-500 rounded">
          Create
        </button>
      </header>

      <main className="p-4">
        <div className="grid grid-flow-col auto-cols-max">
          {userOwned.map((list: any) => {
            return (
              <Card key={list._id}>
                <>
                  <h3 className="text-lg font-semibold">{list.name}</h3>
                  <h4 className="text-sm font-thin">{list.description}</h4>

                  <div className="flex flex-col p-2 shadow-inner rounded bg-gray-200 mt-2">
                    {list.urls.map((link: string) => {
                      return (
                        <a
                          className="bg-white text-purple-400 font-semibold text-sm py-1 px-2 rounded my-1 shadow-md whitespace-nowrap max-link-width overflow-ellipsis overflow-hidden"
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

                  <button className="bg-purple-600 mt-2 w-full p-1 font-semibold rounded text-sm text-white">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-1"
                      size="sm"
                    />
                    Schedule
                  </button>
                </>
              </Card>
            );
          })}
        </div>

        <ListCreationModal
          isShowing={isListCreationModalShowing}
          setIsShowing={setIsListCreationModalShowing}
        />
      </main>
    </>
  );
};

export default List;
