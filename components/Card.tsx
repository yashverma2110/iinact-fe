import React from 'react';

interface CardProps {
  children: any;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="shadow-md rounded w-fit p-2 bg-gray-50">{children}</div>
  );
};

export default Card;
