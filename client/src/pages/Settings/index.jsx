import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Message from '../../components/Message';

const Settings = () => {
  const { user } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Make API call to update user details
    setMessage('Details updated successfully');
  };

  return (
    <div>
      <h1>Settings</h1>
      {message && <Message>{message}</Message>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">New Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Settings;
