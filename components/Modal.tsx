import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faT, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  title: string;
  subtitle: string;

  primary?: {
    title: string;
    onClick: any;
  };
}

const Modal = ({
  isShowing,
  setIsShowing,
  children,
  size,
  title,
  subtitle,
  primary,
}: ModalProps) => {
  if (!isShowing) {
    return <></>;
  }

  const widthForModal = () => {
    switch (size) {
      case 'xs':
        return 'w-1/6';
      case 'md':
        return 'w-2/6';
      case 'lg':
        return 'w-1/2';
      case 'xl':
        return 'w-6/7';
      default:
        break;
    }
  };

  return (
    <div className="h-screen w-screen fixed bg-black bg-opacity-60 top-0 left-0 flex items-center justify-center">
      <div
        className={`bg-white relative p-4 shadow-lg rounded ${widthForModal()}`}
      >
        <button
          className="close-modal-button absolute top-2 right-2"
          onClick={() => setIsShowing(false)}
        >
          <FontAwesomeIcon className="text-gray-400" icon={faTimesCircle} />
        </button>

        <div className="modal-header">
          <h3 className="font-semibold text-lg">{title}</h3>
          <h4 className="text-sm text-gray-400">{subtitle}</h4>
        </div>
        <hr className="border border-gray-200 my-2" />
        <div className="modal-body">{children}</div>

        {primary && <button onClick={primary.onClick}>{primary.title}</button>}
      </div>
    </div>
  );
};

export default Modal;
