import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Message from "../../components/Message";
import Form_Button from "../../components/Form_Button";
import Form_Input from "../../components/Form_Input";
import CustomLink from "../../components/CustomLink";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      navigate("/all-boards");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <Message message={error} type="error" />
        <h2 className="text-3xl font-bold m-2 text-center">Login</h2>
      <form onSubmit={handleLogin} className="m-2 w-64 rounded-lg border border-gray-400 bg-blue-50 px-2 py-3">
        <Form_Input
          label="Username:"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          formElementId="login-field-username"
          ariaLabel="Field in which to input the username"
        />
        <Form_Input
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          formElementId="login-field-password"
          ariaLabel="Field in which to input the password"
        />
        <Form_Button
          buttonText="Login"
          formElementId="login-page-button-login"
          ariaLabel="Button for logging in"
        />
      </form>
    </main>
  );
};

export default LoginPage;
