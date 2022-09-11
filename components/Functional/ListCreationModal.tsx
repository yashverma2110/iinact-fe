import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateListMetadata } from '../../metadata/form/list.metadata';
import listActions from '../../redux/actions/list.actions';
import ListService from '../../services/ListService';
import { isValidLink } from '../../utils/methods';
import { FormHandler } from '../FormHandler';
import Modal from '../Modal';

interface ListCreationModalProps {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListCreationModal = ({
  isShowing,
  setIsShowing,
}: ListCreationModalProps) => {
  const dispatch = useDispatch();
  const inputRef = useRef<any>();
  const [inValidLinkErrorMessage, setInValidLinkErrorMessage] = useState<
    string | null
  >(null);
  const [listOfLinks, setListOfLinks] = useState<string[]>([]);

  const handleListCreation = async (list: any) => {
    const payload = {
      ...list,
      urls: listOfLinks,
    };
    const { success, data, error } = await ListService.create(payload);
    if (success) {
      dispatch(listActions.create(data));
    }
  };

  const handleKeydown = (key: string) => {
    if (key === 'Enter') {
      handleChangeInLinkList('add');
    }
  };

  const handleChangeInLinkList = (
    action: 'add' | 'remove',
    removeIndex?: number
  ) => {
    const link = inputRef.current?.value;
    if (action === 'add') {
      if (!isValidLink(link)) {
        setInValidLinkErrorMessage('Link is invalid');
        return;
      }

      if (listOfLinks.includes(link)) {
        setInValidLinkErrorMessage('This link already exists!');
        return;
      }

      setInValidLinkErrorMessage(null);
      setListOfLinks([link, ...listOfLinks]);
    }
  };

  return (
    <Modal
      size="md"
      isShowing={isShowing}
      setIsShowing={setIsShowing}
      title="Create a schedule to be reminded"
      subtitle="Start your routine and stay in track"
    >
      <FormHandler
        context={CreateListMetadata}
        onSubmit={handleListCreation}
        buttonTitle="Create"
      >
        <>
          <div className="p-2 mt-2 bg-gray-100 shadow-inner rounded flex flex-col max-h-40 overflow-y-auto">
            {listOfLinks.map((link) => {
              return (
                <a
                  className="shadow-md py-1 text-sm font-semibold text-purple-400 bg-white rounded-full px-2 my-1"
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

          <input
            ref={inputRef}
            className="w-full mt-2 bg-gray-100 shadow-inner rounded text-sm p-1"
            type="text"
            placeholder="https://leetcode.com/some-question"
            onKeyDown={(event) => handleKeydown(event.key)}
          />

          {inValidLinkErrorMessage && (
            <div className="text-xs text-red-500 font-light">
              {inValidLinkErrorMessage}
            </div>
          )}
        </>
      </FormHandler>
    </Modal>
  );
};

export default ListCreationModal;
