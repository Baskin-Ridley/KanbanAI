import React from "react";

const Form_Label = ({ label, formElementId }) => {

  return (
    <div className="mb-4 text-center ">
      <label className="block color-text-4 font-bold mb-2" htmlFor={formElementId}>{label}</label>
    </div>
  );
};

export default Form_Label;
