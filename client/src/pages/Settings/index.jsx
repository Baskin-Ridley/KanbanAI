import React, { useState, useContext } from 'react';
import Form_Button from "../../components/Form_Button";
import Form_Input from "../../components/Form_Input";
//import { UserContext } from '../../context/UserContext';
import Message from '../../components/Message';

const Settings = () => {
  //const { user } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Make API call to update user details
    setMessage('Details updated successfully');
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 m-12 text-center">Settings</h2>
      {message && <Message>{message}</Message>}
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Form_Input label="New Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} formElementId="password" ariaLabel="Field for inputting the password" />
        </div>
        <div className="mb-4">
          <Form_Input label="New Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} formElementId="email" ariaLabel="Field for inputting the email" />
        </div>
        <Form_Button buttonText="Update" ariaLabel="Button for submitting the form" />
      </form>
    </main>
  );
};

export default Settings;
