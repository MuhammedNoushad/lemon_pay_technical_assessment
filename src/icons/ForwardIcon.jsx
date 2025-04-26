import React from "react";

const ForwardIcon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="13"
      height="24"
      viewBox="0 0 13 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.6571 12.7109L5.00006 18.3679L3.58606 16.9539L8.53606 12.0039L3.58606 7.05389L5.00006 5.63989L10.6571 11.2969C10.8445 11.4844 10.9498 11.7387 10.9498 12.0039C10.9498 12.2691 10.8445 12.5234 10.6571 12.7109Z"
        fill="black"
      />
    </svg>
  );
};

export default ForwardIcon;
