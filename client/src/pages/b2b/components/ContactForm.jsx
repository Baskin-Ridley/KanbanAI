import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    fetch("http://localhost:5000/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        person: name,
        company: company,
        email: email,
        body: message,
      }),
    });
  };

  return (
    <div className="">
      <div className="flex bg-gray-800 h-full p-8  ">
        <div className="flex justify-center items-center">
          <div className="flex-1 pr-8 ">
            <h2 className="text-3xl text-white font-bold mb-8">
              Improve with Kanban AI today!
            </h2>
            <p className="text-gray-400 leading-loose mb-4 max-w-2xl	">
              Kanban AI is the perfect tool to boost your team's productivity
              and streamline your workflow.
              <br />
              With our advanced features and intuitive interface, you can easily
              manage tasks, track progress, and collaborate with your team in
              real-time.
              <br />
              Join the thousands of teams that have already benefited from using
              Kanban AI and take your productivity to the next level.
              <br /> Don't wait any longer to start reaping the benefits of
              Kanban AI. Contact us today to get a custom quote and schedule a
              demo. We look forward to hearing from you!
            </p>
          </div>
        </div>

        <form className="flex-1" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="company"
            >
              Company
            </label>
            <input
              className="appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="company"
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="5"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-center">
            {submitted ? (
              <p className="text-white">Thanks for submitting!</p>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
