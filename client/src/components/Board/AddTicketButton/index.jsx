import React from "react";

const Form_Button = ({ buttonText, onClick, formElementId, ariaLabel, additionalClasses }) => {
  let classes=`bg-blue-300 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-normal text-black focus:outline-none hover:bg-blue-400 hover:text-white ${additionalClasses}`
  return (
    <div className="mt-2 flex flex-col items-center justify-center">
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
