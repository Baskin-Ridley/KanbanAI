import React, { useState, useContext } from 'react';
import { Button, Input } from '../../components';
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
    <div className="form-container">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      {message && <Message>{message}</Message>}
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            New Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            New Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <Button
          type="submit"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default Settings;
