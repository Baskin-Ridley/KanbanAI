import React from "react";
import Form_Label from "../Form_Label";

const Form_DropDown = ({ label, value, onChange, formElementId, ariaLabel, listOptions }) => {
    //const listOptions = ["Leader", "Member"];

    return (
        <div className="mb-4">
            <Form_Label label={label} formElementId={formElementId} />
            <select
                className=" appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={value}
                onChange={onChange}
                id={formElementId}
                aria-label={ariaLabel}
                name={formElementId}
            >
                {listOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Form_DropDown;
