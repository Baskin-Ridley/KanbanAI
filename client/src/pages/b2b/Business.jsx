import React from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Hook from "./components/Hook";
import ContactForm from "./components/ContactForm";
import Footer from "../../components/Footer";
const Business = () => {
  return (
    <div>
      <div className="sticky top-0">
        <Header />
      </div>
      <Landing />
      <Hook />
      <ContactForm />
      <footer className="p-2 text-center text-xs w-full bg-gray-800 text-white">
        <p>
          Kanban AI. Created by Kay, Gabriel, Sho and Gabrielle. License: MIT.
        </p>
      </footer>
    </div>
  );
};

export default Business;
