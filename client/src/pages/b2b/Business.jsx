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
      <div className="static">
        <Footer />
      </div>
    </div>
  );
};

export default Business;
