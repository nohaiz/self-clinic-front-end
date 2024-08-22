import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorServices from "../../services/doctorServices";

const CreateDoctorForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    CPR: "",
    contactNumber: "",
    specialization: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    availability: [{ day: "", startTime: "", endTime: "" }],
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (index, e) => {
    const { name, value } = e.target;
    const newAvailability = [...formData.availability];
    newAvailability[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      availability: newAvailability,
    }));
  };

  const addAvailabilitySlot = () => {
    setFormData((prevData) => ({
      ...prevData,
      availability: [
        ...prevData.availability,
        { day: "", startTime: "", endTime: "" },
      ],
    }));
  };

  const removeAvailabilitySlot = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      availability: prevData.availability.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await doctorServices.createDoctor(formData);
      navigate("/users");
    } catch (error) {
      setErrors({
        general: "There was an error creating the doctor. Please try again.",
      });
    }
  };
  const validateForm = () => {
    const errors = {};
    const {
      firstName,
      lastName,
      CPR,
      contactNumber,
      specialization,
      gender,
      email,
      password,
      confirmPassword,
      availability,
    } = formData;

    if (!email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid.";

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
    if (!contactNumber || !/^[0-9]{8}$/.test(contactNumber))
      errors.contactNumber = "Contact number must be an 8-digit number.";

    if (!specialization.trim())
      errors.specialization = "Specialization is required.";

    if (!gender) errors.gender = "Gender is required.";

    availability.forEach((slot, index) => {
      if (!slot.day) errors[`availabilityDay${index}`] = "Day is required.";
      if (!slot.startTime)
        errors[`availabilityStartTime${index}`] = "Start time is required.";
      if (!slot.endTime)
        errors[`availabilityEndTime${index}`] = "End time is required.";
    });

    return errors;
  };

  return (
    <div className="custom-update-form">
      <div className="container">
        <div className="box column is-three-fifths is-offset-one-fifth has-background-white">
          <p className="title is-2">Create Doctor</p>
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <p className="help is-danger">{errors.general}</p>
            )}

            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control">
                <input
                  className={`input ${errors.email ? "is-danger" : ""}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="help is-danger">{errors.email}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="control">
                <input
                  className={`input ${errors.password ? "is-danger" : ""}`}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <p className="help is-danger">{errors.password}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="control">
                <input
                  className={`input ${errors.confirmPassword ? "is-danger" : ""
                    }`}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && (
                <p className="help is-danger">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="firstName">
                First Name
              </label>
              <div className="control">
                <input
                  className={`input ${errors.firstName ? "is-danger" : ""}`}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              {errors.firstName && (
                <p className="help is-danger">{errors.firstName}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="lastName">
                Last Name
              </label>
              <div className="control">
                <input
                  className={`input ${errors.lastName ? "is-danger" : ""}`}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              {errors.lastName && (
                <p className="help is-danger">{errors.lastName}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="CPR">
                CPR
              </label>
              <div className="control">
                <input
                  className={`input ${errors.CPR ? "is-danger" : ""}`}
                  type="text"
                  name="CPR"
                  value={formData.CPR}
                  onChange={handleChange}
                />
              </div>
              {errors.CPR && <p className="help is-danger">{errors.CPR}</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="contactNumber">
                Contact Number
              </label>
              <div className="control">
                <input
                  className={`input ${errors.contactNumber ? "is-danger" : ""}`}
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
              {errors.contactNumber && (
                <p className="help is-danger">{errors.contactNumber}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="specialization">
                Specialization
              </label>
              <div className="control">
                <input
                  className={`input ${errors.specialization ? "is-danger" : ""
                    }`}
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </div>
              {errors.specialization && (
                <p className="help is-danger">{errors.specialization}</p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="gender">
                Gender:
              </label>
              <div className="control">
                <div className="select">
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              {errors.gender && (
                <p className="help is-danger">{errors.gender}</p>
              )}
            </div>

            <p className="title is-4">Availability</p>
            {formData.availability.map((slot, index) => (
              <div className="box" key={index}>
                <div className="field">
                  <label className="label" htmlFor={`day-${index}`}>
                    Day
                  </label>
                  <div className="control">
                    <div className="select">
                      <select
                        name="day"
                        id={`day-${index}`}
                        value={slot.day}
                        onChange={(e) => handleAvailabilityChange(index, e)}
                      >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                  </div>
                  {errors[`availabilityDay${index}`] && (
                    <p className="help is-danger">
                      {errors[`availabilityDay${index}`]}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="label" htmlFor={`startTime-${index}`}>
                    Start Time
                  </label>
                  <div className="control">
                    <input
                      className={`input ${errors[`availabilityStartTime${index}`]
                        ? "is-danger"
                        : ""
                        }`}
                      type="time"
                      name="startTime"
                      id={`startTime-${index}`}
                      value={slot.startTime}
                      onChange={(e) => handleAvailabilityChange(index, e)}
                    />
                  </div>
                  {errors[`availabilityStartTime${index}`] && (
                    <p className="help is-danger">
                      {errors[`availabilityStartTime${index}`]}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="label" htmlFor={`endTime-${index}`}>
                    End Time
                  </label>
                  <div className="control">
                    <input
                      className={`input ${errors[`availabilityEndTime${index}`] ? "is-danger" : ""
                        }`}
                      type="time"
                      name="endTime"
                      id={`endTime-${index}`}
                      value={slot.endTime}
                      onChange={(e) => handleAvailabilityChange(index, e)}
                    />
                  </div>
                  {errors[`availabilityEndTime${index}`] && (
                    <p className="help is-danger">
                      {errors[`availabilityEndTime${index}`]}
                    </p>
                  )}
                </div>

                <div className="field">
                  <button
                    type="button"
                    className="button is-danger"
                    onClick={() => removeAvailabilitySlot(index)}
                  >
                    Remove Slot
                  </button>
                </div>
              </div>
            ))}
            <div className="custom-button-placement">
              <div className="field">
                <button
                  type="button"
                  className="button is-link"
                  onClick={addAvailabilitySlot}
                >
                  Add Availability Slot
                </button>
              </div>
            </div>
            <div className="custom-button-placement">
              <div className="field">
                <button type="submit" className="button is-primary">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctorForm;
