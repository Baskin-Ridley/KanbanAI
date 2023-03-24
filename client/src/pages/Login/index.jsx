import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Message from "../../components/Message";
import Button from "../../components/Button";
import Input from "../../components/Input";
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
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="form-container">
      <Message message={error} type="error" />
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <Input
          label="Username:"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <div className="mb-4">
          <span className="text-sm text-gray-600 mr-2">
            Don't have an account?
          </span> <br />
          <CustomLink
            to="/register"
          >
            <Button type="submit">Register</Button>
            {/* Register here. */}
          </CustomLink>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
