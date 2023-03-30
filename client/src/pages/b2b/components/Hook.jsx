import React from "react";
import { Link } from "react-router-dom";

const Hook = () => {
  function handleClick() {
    window.scrollTo(window.scrollTo(0, 0));
  }

  return (
    <div className="max-w mx-auto flex h-96 flex-col justify-center bg-gradient-to-br from-indigo-500 to-[#86AFB1] p-8 text-center align-middle shadow-lg">
      <h2 className="mb-6 flex justify-center align-middle text-3xl font-bold text-white">
        What is Kanban AI?
      </h2>
      <p className="leading-8 text-white">
        Kanban AI is a project management solution with all the features you
        would expect but with a little more magic... Each feature is powerful on
        its own but when supercharged by AI they become truly groundbreaking.
      </p>
      <Link
        to="/login"
        onClick={handleClick}
        className="animate-shake mx-auto mt-6 w-36 rounded-lg bg-white p-4 py-2 px-4 text-blue-500 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
      >
        Start Free!
      </Link>
    </div>
  );
};

export default Hook;
