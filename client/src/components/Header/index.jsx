import React from 'react';
import "../../index.css";

const Header = () => (
  <header>
    <div className="color-bg-0 py-4 md:flex md:justify-between md:items-center">
      <div className="flex items-center justify-center md:justify-start px-4">
        <h1>Logo</h1>
      </div>
      <div className="hidden md:flex items-center justify-center px-4">
        <div className="color-bg-1 w-12 h-12 mr-2 transform scale-3"></div>
        <div className="color-bg-2 w-12 h-12 mr-2 transform scale-3"></div>
        <div className="color-bg-3 w-12 h-12 mr-2 transform scale-3"></div>
        <div className="color-bg-4 w-12 h-12 mr-2 transform scale-3"></div>
      </div>
    </div>
  </header>
);

export default Header;
