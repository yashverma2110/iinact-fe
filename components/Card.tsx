import React from 'react';

interface CardProps {
  children: any;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="shadow-lg border border-slate-100 rounded w-fit p-2 bg-white">
      {children}
    </div>
  );
};

export default Card;
