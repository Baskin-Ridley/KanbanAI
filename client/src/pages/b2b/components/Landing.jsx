import React from "react";
import bgImage from "./bg.avif";

const Landing = () => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          Get Started with Kanban AI
        </h1>
        <p className="text-2xl text-white text-center">
          Whether you want ease of use, increased collaboration, or integrated
          testing, Kanban AI has a solution for you!
          <br />
          <br />
          <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default Landing;
