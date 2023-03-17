import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Message from '../../components/Message';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        navigate('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Error logging in');
      console.error('Error logging in:', error);
    }
  };

  return (
    <main className="w3-container w3-center">
      <h2>Login</h2>
      {/* {error && <p className="w3-text-red">{error}</p>} */}
      <Message message={error} type="error" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w3-input w3-margin-bottom"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w3-input w3-margin-bottom"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w3-button w3-black">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
