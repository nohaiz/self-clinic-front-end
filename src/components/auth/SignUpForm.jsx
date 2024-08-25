import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";

import "../auth/auth.css";

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

      if (response.error || response.message) {
        setErrors({ general: `User data entry invalid. Please try again. ${response.error}` });
      } else {
        prop.setUser(response);
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
    <div className="hero is-small">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered is-vcentered">
            <div className="column is-8-tablet is-6-desktop is-5-widescreen">
              <div className="box" style={{ minHeight: '600px' }}>
                <h1 className="title has-text-centered">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                  {errors.general && <div className="notification is-danger">{errors.general}</div>}

                  <div className="field">
                    <label className="label" htmlFor="email">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`input ${errors.email ? "is-danger" : ""}`}
                        placeholder="e.g. example@gmail.com"
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && <p className="help is-danger">{errors.email}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="password">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={`input ${errors.password ? "is-danger" : ""}`}
                        placeholder="********"
                        value={password}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.password && <p className="help is-danger">{errors.password}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                    <div className="control">
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={`input ${errors.confirmPassword ? "is-danger" : ""}`}
                        placeholder="********"
                        value={confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.confirmPassword && <p className="help is-danger">{errors.confirmPassword}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="firstName">First Name</label>
                    <div className="control">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className={`input ${errors.firstName ? "is-danger" : ""}`}
                        placeholder="John"
                        value={firstName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.firstName && <p className="help is-danger">{errors.firstName}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="lastName">Last Name</label>
                    <div className="control">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className={`input ${errors.lastName ? "is-danger" : ""}`}
                        placeholder="Doe"
                        value={lastName}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.lastName && <p className="help is-danger">{errors.lastName}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="CPR">CPR</label>
                    <div className="control">
                      <input
                        type="text"
                        name="CPR"
                        id="CPR"
                        className={`input ${errors.CPR ? "is-danger" : ""}`}
                        placeholder="123456789"
                        value={CPR}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.CPR && <p className="help is-danger">{errors.CPR}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="gender">Gender</label>
                    <div className="control">
                      <div className={`select is-small ${errors.gender ? "is-danger" : ""} `}>
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
                      </div>
                    </div>
                    {errors.gender && <p className="help is-danger">{errors.gender}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="DOB">Date of Birth</label>
                    <div className="control">
                      <input
                        type="date"
                        name="DOB"
                        id="DOB"
                        className={`input ${errors.DOB ? "is-danger" : ""}`}
                        value={DOB}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    {errors.DOB && <p className="help is-danger">{errors.DOB}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="contactNumber">Contact Number</label>
                    <div className="control">
                      <input
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        className={`input ${errors.contactNumber ? "is-danger" : ""}`}
                        placeholder="12345678"
                        value={contactNumber}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.contactNumber && <p className="help is-danger">{errors.contactNumber}</p>}
                  </div>

                  <div className="field">
                    <button type="submit" className="button is-fullwidth is-white">Sign Up</button>
                  </div>

                  <div className="field">
                    <button type="button" className="button is-link is-fullwidth" onClick={() => navigate("/")}>Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
