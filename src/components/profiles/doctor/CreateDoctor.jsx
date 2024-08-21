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
    <form onSubmit={handleSubmit}>
      {errors.general && <p>{errors.general}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p>{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p>{errors.password}</p>}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      {errors.firstName && <p>{errors.firstName}</p>}

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      {errors.lastName && <p>{errors.lastName}</p>}

      <label htmlFor="CPR">CPR</label>
      <input
        type="text"
        name="CPR"
        value={formData.CPR}
        onChange={handleChange}
      />
      {errors.CPR && <p>{errors.CPR}</p>}

      <label htmlFor="contactNumber">Contact Number</label>
      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
      />
      {errors.contactNumber && <p>{errors.contactNumber}</p>}

      <label htmlFor="specialization">Specialization</label>
      <input
        type="text"
        name="specialization"
        value={formData.specialization}
        onChange={handleChange}
      />
      {errors.specialization && <p>{errors.specialization}</p>}

      <label htmlFor="gender">Gender:</label>
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
      {errors.gender && <p>{errors.gender}</p>}

      <p>Availability</p>
      {formData.availability.map((slot, index) => (
        <div key={index}>
          <label htmlFor={`day-${index}`}>Day</label>
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
          {errors[`availabilityDay${index}`] && (
            <p>{errors[`availabilityDay${index}`]}</p>
          )}

          <label htmlFor={`startTime-${index}`}>Start Time</label>
          <input
            type="time"
            name="startTime"
            id={`startTime-${index}`}
            value={slot.startTime}
            onChange={(e) => handleAvailabilityChange(index, e)}
          />
          {errors[`availabilityStartTime${index}`] && (
            <p>{errors[`availabilityStartTime${index}`]}</p>
          )}

          <label htmlFor={`endTime-${index}`}>End Time</label>
          <input
            type="time"
            name="endTime"
            id={`endTime-${index}`}
            value={slot.endTime}
            onChange={(e) => handleAvailabilityChange(index, e)}
          />
          {errors[`availabilityEndTime${index}`] && (
            <p>{errors[`availabilityEndTime${index}`]}</p>
          )}

          <button type="button" onClick={() => removeAvailabilitySlot(index)}>
            Remove Slot
          </button>
        </div>
      ))}

      <button type="button" onClick={addAvailabilitySlot}>
        Add Availability Slot
      </button>

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateDoctorForm;
