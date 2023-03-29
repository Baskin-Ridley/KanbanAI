import React from "react";
import Form_Label from "../Form_Label";

const Form_Textarea = ({ label, value, onChange, formElementId, ariaLabel }) => {
    return (
        <div className="mb-4">
            <Form_Label label={label} formElementId={formElementId} />
            <textarea className=" appearance-none  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                cols="20"
                id={formElementId}
                value={value}
                onChange={onChange}
                aria-label={ariaLabel}
                name={formElementId}
            />
        </div>
    );
};

export default Form_Textarea;
