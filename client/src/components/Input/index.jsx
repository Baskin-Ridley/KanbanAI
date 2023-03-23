import React from "react";

const Input = ({ label, value, onChange, type }) => {
  const roleOptions = ["Leader", "Member"];

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      {label === "Role:" ? (
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={value}
          onChange={onChange}
        >
          {roleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )  : (
        <input
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
