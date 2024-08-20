import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import doctorServices from "../../services/doctorServices";

const UpdateDoctorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    CPR: 0,
    contactNumber: "",
    specialization: "",
    availability: [{ day: "", startTime: "", endTime: "" }],
  });

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const doctorData = await doctorServices.fetchDoctor(id);

        setFormData({
          firstName: doctorData.firstName,
          lastName: doctorData.lastName,
          CPR: doctorData.CPR,
          contactNumber: doctorData.contactNumber,
          specialization: doctorData.specialization,
          availability: doctorData.availability || [
            { day: "", startTime: "", endTime: "" },
          ],
        });
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    getDoctor();
  }, [id]);

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
      await doctorServices.updateDoctor(id, formData);
      navigate(`/users/doctors/${id}`);
    } catch (error) {
      console.error("Error updating doctor data:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateDoctorForm;
