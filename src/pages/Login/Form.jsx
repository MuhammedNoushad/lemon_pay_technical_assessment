import React from "react";
import TextInput from "../../components/textInput";

const Form = ({ config, formFor, toggleForm }) => {
  return (
    <form className="md:w-[80%]">
      {config.map((input) => (
        <div key={input.id} className="mb-4">
          <TextInput input={input} />
        </div>
      ))}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            className="w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 font-poppins text-[16px] leading-3 font-normal text-white"
          >
            Remember me
          </label>
        </div>

        <button
          type="button"
          onClick={toggleForm}
          className="font-poppins text-[16px] leading-3 no-underline text-white"
        >
          {formFor === "login" ? "Sign Up" : "Sign In"}
        </button>
      </div>

      <button
        type="submit"
        className="bg-white font-poppins text-[12px]  font-semibold text-black py-2 px-4 w-full rounded"
      >
        {formFor === "login" ? "Sign in" : "Sign Up"}
      </button>
    </form>
  );
};

export default Form;
