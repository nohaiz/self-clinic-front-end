import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";

const SignUpForm = (prop) => {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
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

    if (!email.trim()) errors.email = "Email is required.";
    if (!password || password.length < 8)
      errors.password = "Password must be at least 8 characters long.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!firstName || !/^[A-Za-z]+$/.test(firstName))
      errors.firstName = "First name must contain only letters.";
    if (!lastName || !/^[A-Za-z]+$/.test(lastName))
      errors.lastName = "Last name must contain only letters.";
    if (!CPR || !/^\d{9}$/.test(CPR.toString()))
      errors.CPR = "CPR must be a 9-digit number.";
    if (!gender || !["male", "female"].includes(gender))
      errors.gender = "Gender must be 'male' or 'female'.";
    if (!DOB || new Date(DOB) > Date.now())
      errors.DOB = "Date of birth cannot be a future date.";
    if (!contactNumber || !/^[0-9]{8}$/.test(contactNumber))
      errors.contactNumber = "Contact number must be an 8-digit number.";

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
      const response = await authServices.signup(formData);
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

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {errors.general && <p>{errors.general}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <label htmlFor="CPR">CPR</label>
        <input
          type="text"
          name="CPR"
          id="CPR"
          value={CPR}
          onChange={handleChange}
        />
        {errors.CPR && <p className="error">{errors.CPR}</p>}

        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <label htmlFor="DOB">Date of Birth</label>
        <input
          type="date"
          name="DOB"
          id="DOB"
          value={DOB}
          onChange={handleChange}
        />
        {errors.DOB && <p className="error">{errors.DOB}</p>}

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          id="contactNumber"
          value={contactNumber}
          onChange={handleChange}
        />
        {errors.contactNumber && (
          <p className="error">{errors.contactNumber}</p>
        )}

        <button type="submit" onClick={() => Object.keys(errors).length > 0}>
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
