import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import adminServices from "../../services/adminServices";

const AdminForm = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    CPR: "",
    contactNumber: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAdminData = async () => {
      const data = await adminServices.fetchAdmin(id);
      if (id) {
        setFormData(data);
      }
    };
    fetchAdminData();
  }, [id]);

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
      contactNumber,
    } = formData;

    if (!id) {
      if (!email.trim()) errors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid.";

      if (!password || password.length < 8)
        errors.password = "Password must be at least 8 characters long.";
      if (password !== confirmPassword)
        errors.confirmPassword = "Passwords do not match.";
    }

    if (!firstName || !/^[A-Za-z]+$/.test(firstName))
      errors.firstName = "First name must contain only letters.";
    if (!lastName || !/^[A-Za-z]+$/.test(lastName))
      errors.lastName = "Last name must contain only letters.";
    if (!CPR || !/^\d{9}$/.test(CPR.toString()))
      errors.CPR = "CPR must be a 9-digit number.";
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
    if (id) {
      try {
        setErrors({});
        const response = await adminServices.updateAdmin(formData, id);
        if (response.error) {
          setErrors({ general: "User data entry invalid. Please try again." });
        } else {
          navigate(`/users/admins/${id}`);
        }
      } catch (error) {
        console.log(error);
        setErrors({
          general: "User data entry invalid. Please try again.",
        });
      }
    } else {
      try {
        setErrors({});
        const response = await adminServices.createAdmin(formData);

        if (response.error) {
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
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      CPR: "",
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
    contactNumber,
  } = formData;

  return (
    <>
      <h1>{id ? "Update Administrator Profile" : "Administrator Registration"}</h1>
      <form onSubmit={handleSubmit}>
        {errors.general && <p>{errors.general}</p>}

        {!id ? (
          <>
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

            <>
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
            </>
          </>
        ) : (
          <>
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
          </>
        )}

        <button type="submit">{id ? `Confirm` : 'Sign up' }</button>
      </form>
      {id ? 
      <button type="button" onClick={() =>navigate(`/users/admins/${id}`)}> Back</button>
      :
      <button type="button" onClick={() =>navigate('/users')}> Back</button>
      }
    </>
  );
};

export default AdminForm;
