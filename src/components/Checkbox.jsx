import React from "react";

const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center mx-2">
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="inline-block relative w-8 h-8 border rounded-full border-gray-300 cursor-pointer mr-2"
      >
        <span
          className={`absolute inset-0 rounded-full ${
            checked ? "bg-[#97EE88]" : "bg-grey"
          }`}
        ></span>
        <span className="absolute inset-0 flex items-center justify-center w-full h-full">
          <svg
            className="w-4 h-4 text-[#2F2F2F] fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </span>
      </label>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
