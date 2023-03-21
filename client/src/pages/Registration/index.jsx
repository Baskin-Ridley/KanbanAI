import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const Registration = () => {
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        data
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            ref={register({ required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            ref={register({ required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <p>
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </div>
  );
};

export default Registration;
