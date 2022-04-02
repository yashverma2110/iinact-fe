import React from "react";

interface CountdownLoadingProps {
  size: number;
  margin?: string;
}

const CountdownLoading = ({ size, margin = "" }: CountdownLoadingProps) => {
  return (
    <div
      style={{ height: `${size}px`, width: `${size}px`, borderWidth: "14px" }}
      className={`${margin} border-slate-200 animate-pulse rounded-full`}
    ></div>
  );
};

export default CountdownLoading;
