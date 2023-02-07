import React from "react";

export type ConfigSection = {
  title: string;
  btnText: string;
  btnBg: string;
  btnHoverBg: string;
  onClick: () => void;
};

const Section = ({
  title,
  btnText,
  btnBg,
  btnHoverBg,
  onClick
}: ConfigSection): JSX.Element => (
  <div className="mt-4 text-sm">
    <span className="block text-left">{title}</span>
    <button
      className={`w-full mt-2 p-1 text-center text-chiyuki ${btnBg} hover:${btnHoverBg} transition-colors rounded-2xl shadow-md`}
      onClick={onClick}
    >
      {btnText}
    </button>
  </div>
);

export default Section;
