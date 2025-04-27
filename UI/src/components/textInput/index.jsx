import React from "react";

const TextInput = ({ input }) => {
  return (
    <>
      <label
        for={input.id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {input.label}
      </label>
      <input
        type={input.type}
        name={input.name}
        id={input.id}
        placeholder={input.placeholder}
        className="bg-[rgba(230,225,250,0.64)] focus:bg-[rgba(230,225,250,0.64)] active:bg-[rgba(230,225,250,0.64)] hover:bg-[rgba(230,225,250,0.64)] border border-[#e4e4e7] text-sm rounded-lg block w-full p-2.5 text-white placeholder-white"
        required
        autocomplete="off"
      />
    </>
  );
};

export default TextInput;
