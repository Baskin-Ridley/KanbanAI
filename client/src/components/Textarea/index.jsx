import React from "react";

const Textarea = ({ label, value, onChange, id }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}</label>
            <textarea className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                rows="4" cols="50" id="tests-for-function" value={value} onChange={onChange} />
        </div>
    );
};

export default Textarea;
