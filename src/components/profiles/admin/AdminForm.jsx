import "../admin/admin.css"

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
  }, [id,errors.general]);

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
    <div className="custom-form">
      <div className="container">
        <form onSubmit={handleSubmit} className="box column is-three-fifths is-offset-one-fifth">
          <p className="title is-2 is-spaced">
            {id ? "Update Admin Profile" : "Administrator Registration"}
          </p>
          {errors.general && <div className="notification is-danger">{errors.general}</div>}
  
          {!id ? (
            <>
              <div className="field">
                <label className="label" htmlFor="email">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    id="email"
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
                    className="input"
                    type="password"
                    name="password"
                    id="password"
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
                    className="input"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
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
                    className="input"
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    className="input"
                    type="text"
                    name="lastName"
                    id="lastName"
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
                    className="input"
                    type="text"
                    name="CPR"
                    id="CPR"
                    value={CPR}
                    onChange={handleChange}
                  />
                </div>
                {errors.CPR && <p className="help is-danger">{errors.CPR}</p>}
              </div>
  
              <div className="field">
                <label className="label" htmlFor="contactNumber">Contact Number</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={handleChange}
                  />
                </div>
                {errors.contactNumber && <p className="help is-danger">{errors.contactNumber}</p>}
              </div>
            </>
          ) : (
            <>
              <div className="field">
                <label className="label" htmlFor="firstName">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    className="input"
                    type="text"
                    name="lastName"
                    id="lastName"
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
                    className="input"
                    type="text"
                    name="CPR"
                    id="CPR"
                    value={CPR}
                    onChange={handleChange}
                  />
                </div>
                {errors.CPR && <p className="help is-danger">{errors.CPR}</p>}
              </div>
  
              <div className="field">
                <label className="label" htmlFor="contactNumber">Contact Number</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={handleChange}
                  />
                </div>
                {errors.contactNumber && <p className="help is-danger">{errors.contactNumber}</p>}
              </div>
            </>
          )}
  
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                {id ? `Confirm` : 'Sign up' }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AdminForm;
