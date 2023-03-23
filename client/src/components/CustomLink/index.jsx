import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, className, children }) => {
  return (
    <Link
      to={to}
      className={`inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ${className}`}
    >
      {children}
    </Link>
  );
};

export default CustomLink;