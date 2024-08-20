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
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await doctorServices.createDoctor(formData);
      navigate("/users");
    } catch (error) {
      console.error("Error creating doctor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />

      <label htmlFor="CPR">CPR</label>
      <input
        type="text"
        name="CPR"
        value={formData.CPR}
        onChange={handleChange}
      />

      <label htmlFor="contactNumber">Contact Number</label>
      <input
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
      />

      <label htmlFor="specialization">Specialization</label>
      <input
        type="text"
        name="specialization"
        value={formData.specialization}
        onChange={handleChange}
      />

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

      <p>Availability</p>
      {formData.availability.map((slot, index) => (
        <div key={index}>
          <label htmlFor={`day-${index}`}>Day</label>
          <input
            type="text"
            name="day"
            id={`day-${index}`}
            value={slot.day}
            onChange={(e) => handleAvailabilityChange(index, e)}
          />

          <label htmlFor={`startTime-${index}`}>Start Time</label>
          <input
            type="time"
            name="startTime"
            id={`startTime-${index}`}
            value={slot.startTime}
            onChange={(e) => handleAvailabilityChange(index, e)}
          />

          <label htmlFor={`endTime-${index}`}>End Time</label>
          <input
            type="time"
            name="endTime"
            id={`endTime-${index}`}
            value={slot.endTime}
            onChange={(e) => handleAvailabilityChange(index, e)}
          />

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
