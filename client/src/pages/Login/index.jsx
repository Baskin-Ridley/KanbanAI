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
      <form onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold mb-8 m-12 text-center">Login</h2>
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
        <div className="mb-4 text-center">
          <br />
          <p className="text-sm text-gray-600 mr-2">Don't have an account?</p>
          <CustomLink to="/register">
            <Form_Button
              buttonText="Register"
              formElementId="login-page-button-register"
              ariaLogin="Button for registering"
            />
          </CustomLink>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
