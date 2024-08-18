import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    CPR: "",
    gender: "",
    DOB: "",
    contactNumber: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateMessage("");
      const response = await authServices.signup(formData);
      console.log(response);
      if (response.error || response.message) {
        updateMessage(`${response.error || ""} ${response.message || ""}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      updateMessage(error.message);
    }

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      CPR: "",
      gender: "",
      DOB: "",
      contactNumber: "",
    });
  };

  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    CPR,
    gender,
    DOB,
    contactNumber,
  } = formData;

  const isFormValid = () => {
    // return !(
    //   email &&
    //   password &&
    //   confirmPassword &&
    //   firstName &&
    //   lastName &&
    //   CPR &&
    //   gender &&
    //   DOB &&
    //   contactNumber &&
    //   password === confirmPassword
    // );
  };

  return (
    <>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label htmlFor="CPR">CPR</label>
        <input
          type="number"
          name="CPR"
          id="CPR"
          value={formData.CPR}
          onChange={handleChange}
        />

        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="DOB">Date of Birth</label>
        <input
          type="date"
          name="DOB"
          id="DOB"
          value={formData.DOB}
          onChange={handleChange}
        />

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          id="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <button type="submit" disabled={isFormValid()}>
          Sign Up
        </button>
      </form>
      <button type="button" onClick={() => navigate("/")}>
        Back
      </button>
    </>
  );
};

export default SignUpForm;
