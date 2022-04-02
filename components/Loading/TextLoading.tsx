import React from "react";

interface TextLoadingProps {
  height: string;
  width: string;
  margin?: string;
}

const BoxLoading = ({ height, width, margin = "" }: TextLoadingProps) => {
  return (
    <div
      className={`${height} ${width} ${margin} bg-slate-200 animate-pulse rounded-lg`}
    ></div>
  );
};

export default BoxLoading;
