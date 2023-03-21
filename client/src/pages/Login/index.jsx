import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import Message from '../../components/Message';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('http://localhost:3001/login', {
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
    <main>
    {/* <main className="w3-container w3-center"> */}
      <h2>Login</h2>
      {/* {error && <p className="w3-text-red">{error}</p>} */}
      <Message message={error} type="error" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          // className="w3-input w3-margin-bottom"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          // className="w3-input w3-margin-bottom"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <button type="submit" className="w3-button w3-black"> */}
        <button type="submit">
          Login
        </button>
      </form>
    </main>
    // <>
      /* <main className="container">
        <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-button">
            {isLoginForm ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="register-link">
          <p>
            {isLoginForm
              ? "Don't have an account?"
              : 'Already have an account?'}
            <button className="switch-button" onClick={toggleForm}>
              {isLoginForm ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </main> */
    
    // </>
  );
};

export default Login;
