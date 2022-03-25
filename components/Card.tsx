import React from "react";

interface CardProps {
  children: any;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="shadow-lg p-4 rounded bg-white border border-slate-100">
      {children}
    </div>
  );
};

export default Card;
