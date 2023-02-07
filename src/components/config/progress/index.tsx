import React from "react";
import { CgSpinner } from "react-icons/cg";

const Progress = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center text-2xl text-luca animate-pulse">
      <CgSpinner className="animate-spin" />
      <span className="ml-4 tracking-wide">Please wait...</span>
    </div>
  );
};

export default Progress;
