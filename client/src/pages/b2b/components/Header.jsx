import React from "react";

const Header = () => {
  const handleContactSalesClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className=" bg-gray-800 text-white shadow-md flex flex-row justify-between p-2">
      <div>Logo</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleContactSalesClick}
      >
        Contact Sales
      </button>
    </div>
  );
};

export default Header;
