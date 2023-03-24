import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Message from "../../components/Message";
import Button from "../../components/Button";
import Input from "../../components/Input";
import CustomLink from "../../components/CustomLink";

const Registration = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        username,
        name,
        password,
        email,
        role,
        avatar,
      });
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <Input
          label="Username:"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Name:"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Password:"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Email:"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Role:"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          label="Avatar:"
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <Button type="submit">Register</Button>
      </form>
      <Message message={errorMessage} type="error" />
    </main>
  );
};

export default Registration
