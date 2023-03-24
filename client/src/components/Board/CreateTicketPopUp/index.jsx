import React, { useEffect, useState } from "react";

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
                <button onClick={closeModal}>Test</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTicketPopUp;
