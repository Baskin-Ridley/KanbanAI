import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, className, children }) => {
  return (
    <Link
      to={to}
      className={`inline-block align-baseline font-bold text-md text-blue-500 hover:text-white ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
