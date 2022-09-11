import React from "react";

interface Props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

function Button({ title, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-[#036756]"
      } hover:bg-[#036756]  text-white py-2 px-4 shadow-md rounded-md`}
    >
      {title}
    </button>
  );
}

export default Button;
