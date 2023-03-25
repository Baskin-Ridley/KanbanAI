import React from "react";
import Form_Label from "../Form_Label";

const Form_Input = ({ label, type, value, onChange, formElementId, ariaLabel }) => {

  return (
    <div className="mb-4">
      <Form_Label label={label} formElementId={formElementId} />

      <input
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline resize-none h-auto"
        type={type}
        value={value}
        onChange={onChange}
        id={formElementId}
        aria-label={ariaLabel}
      />

    </div>
  );
};

export default Form_Input;
