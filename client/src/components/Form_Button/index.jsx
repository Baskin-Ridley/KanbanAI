import React from "react";

const Form_Button = ({ buttonText, onClick, formElementId, ariaLabel }) => {
  return (
    <button
      className="color-bg-0 hover:color-bg-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onClick}
      id={formElementId}
      aria-label={ariaLabel}
      type="submit"
    >
      {buttonText}
    </button>
  );
};

export default Form_Button;
