import React, { useEffect, useState } from "react";
import Form_Button from "../../Form_Button";
import Form_Input from "../../Form_Input";
const CreateTicketPopUp = (props) => {
  const closeModal = () => {
    props.setIsOpenCreate(false);
  };

  return (
    <>
      {props.isOpenCreate && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="p-4">
                <div className="flex flex-col	justify-between">
                  <h2 className="text-xl font-bold">Create New Task</h2>
                  <h3>{props.id}</h3>
                  <Form_Button
                    buttonText="Save"
                    onClick={() => props.handleAddSubItem(props.id)}
                    ariaLabel="Button for saving the data"
                  />
                  <Form_Button
                    buttonText="Close"
                    onClick={closeModal}
                    ariaLabel="Button for closing the modal popup view"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTicketPopUp;
