import React from "react";

interface LinkItemProps {
  link: string;
  classes?: string;
}

const LinkItem = ({ link, classes = "" }: LinkItemProps) => {
  return (
    <div
      className={
        classes +
        " bg-white shadow rounded-full p-2 my-2 w-full max-w-full overflow-hidden overflow-ellipsis"
      }
    >
      <a
        className="text-red-400 whitespace-nowrap font-semibold text-xs md:text-sm"
        key={link}
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {link}
      </a>
    </div>
  );
};

export default LinkItem;
