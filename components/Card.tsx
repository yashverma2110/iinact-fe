import React from "react";

interface CardProps {
  children: any;
}

const Card = ({ children }: CardProps) => {
  return <div className="shadow-lg p-4 rounded bg-white">{children}</div>;
};

export default Card;
