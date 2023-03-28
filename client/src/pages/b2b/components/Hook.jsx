import React from "react";
import { Link } from "react-router-dom";

const Hook = () => {
  function handleClick() {
    window.scrollTo(window.scrollTo(0, 0));
  }

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-[#86AFB1] shadow-lg p-8 max-w mx-auto text-center">
      <h2 className="text-3xl font-bold text-white mb-6">What is Kanban AI?</h2>
      <p className="text-white leading-8">
        Kanban AI is a project management solution with all the features you
        would expect but with a little more magic... Each feature is powerful on
        its own but when supercharged by AI they become truly groundbreaking.
      </p>
      <Link
        to="/register"
        onClick={handleClick}
        className="bg-white text-blue-500 py-2 px-4 rounded-lg mt-6 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out animate-shake"
      >
        Start Free!
      </Link>
    </div>
  );
};

export default Hook;
