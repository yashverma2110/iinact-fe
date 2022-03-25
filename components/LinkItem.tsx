import React from "react";

interface LinkItemProps {
  link: string;
}

const LinkItem = ({ link }: LinkItemProps) => {
  return (
    <a
      className="text-red-400 bg-white shadow rounded-full p-3 my-2 w-full font-semibold text-xs md:text-sm"
      key={link}
      href={link}
      rel="noopener noreferrer"
      target="_blank"
    >
      {link}
    </a>
  );
};

export default LinkItem;
