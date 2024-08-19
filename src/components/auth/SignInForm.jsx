import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashBoard from "../dashboard/Dashboard";
import authServices from "../services/authServices";

const SignInForm = (prop) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const { email, password } = formData;

    if (!email.trim()) errors.email = "Email is required.";
    if (!password || password.length < 8)
      errors.password = "Password must be at least 8 characters long.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors({});
      const response = await authServices.signin(formData);
      prop.setUser(response);
      if (response.error || response.message) {
        setErrors({ general: "User data entry invalid. Please try again." });
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrors({
        general: "User data entry invalid. Please try again.",
      });
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  const { email, password } = formData;

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        {errors.general && <p>{errors.general}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Sign In</button>
      </form>
      <button type="button" onClick={() => navigate("/")}>
        Back
      </button>
    </>
  );
};

export default SignInForm;
