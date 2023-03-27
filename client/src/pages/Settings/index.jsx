import React, { useState, useContext, useEffect } from 'react';
import Form_Button from "../../components/Form_Button";
import Form_Input from "../../components/Form_Input";
import Message from '../../components/Message';
import { useView } from '../../context/UserContext';

const Settings = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useView();
  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const sendMembers = async () => {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
        try {
          console.log(options.body)
          const response = await fetch("http://localhost:5000/super_user/member", options)
          const listen = await response.json()
          setMessage(listen)
        } catch (error) {
          return ({ "error": error })
        }
      }
      sendMembers();
    }
  }, [submitted, data])

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

  };

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8 m-12 text-center">Settings</h2>
        {message && <Message>{message}</Message>}
        <form className="w-full max-w-md" onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <Form_Input label="New Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} formElementId="password" ariaLabel="Field for inputting the password" />
          </div>
          <div className="mb-4">
            <Form_Input label="New Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} formElementId="email" ariaLabel="Field for inputting the email" />
          </div>
          {user.isSuper &&
            <div className="mb-4">
              <Form_Input label="Add Members" type="text" onChange={(event) => {
                setData((prevstate) => ({
                  "new_member": event.target.value.replaceAll(" ", ",").split(","),
                  "super_user": user.username
                }));
              }} formElementId="add members" ariaLabel="Field for inputting the members" />
            </div>}
          <Form_Button buttonText="Update" ariaLabel="Button for submitting the form" />
        </form>
      </main>
    </>
  );
};

export default Settings;
