import React from "react";

const Form_Button = ({ buttonText, onClick, formElementId, ariaLabel, additionalClasses }) => {
  let classes=`color-bg-0 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none ${additionalClasses}`
  return (
    <div className="mt-2 mb-2 flex flex-col items-center justify-center">
      <button
        className={classes}
        onClick={onClick}
        id={formElementId}
        aria-label={ariaLabel}
        type="submit"
        name={formElementId}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Form_Button;
