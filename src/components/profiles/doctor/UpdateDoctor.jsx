import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import doctorServices from "../../services/doctorServices";
import { useNavigate } from "react-router-dom";

const validDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const UpdateDoctorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    CPR: "",
    contactNumber: "",
    specialization: "",
    availability: [{ day: "", startTime: "", endTime: "" }],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const doctorData = await doctorServices.fetchDoctor(id);

        setFormData({
          firstName: doctorData.firstName,
          lastName: doctorData.lastName,
          CPR: doctorData.CPR.toString(),
          contactNumber: doctorData.contactNumber.toString(),
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
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await doctorServices.updateDoctor(id, formData);
      navigate(`/users/doctors/${id}`);
    } catch (error) {
      console.error("Error updating doctor data:", error);
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
      availability,
    } = formData;

    if (!firstName || !/^[A-Za-z]+$/.test(firstName)) {
      errors.firstName = "First name must contain only letters.";
    }

    if (!lastName || !/^[A-Za-z]+$/.test(lastName)) {
      errors.lastName = "Last name must contain only letters.";
    }

    if (!CPR || !/^\d{9}$/.test(CPR.toString()))
      errors.CPR = "CPR must be a 9-digit number.";

    if (!contactNumber || !/^[0-9]{8}$/.test(contactNumber)) {
      errors.contactNumber = "Contact number must be an 8-digit number.";
    }

    if (!specialization.trim()) {
      errors.specialization = "Specialization is required.";
    }

    availability.forEach((slot, index) => {
      if (!slot.day || !validDays.includes(slot.day)) {
        errors[`availabilityDay${index}`] = "Please select a valid day.";
      }
      if (!slot.startTime) {
        errors[`availabilityStartTime${index}`] = "Start time is required.";
      }
      if (!slot.endTime) {
        errors[`availabilityEndTime${index}`] = "End time is required.";
      }
    });

    return errors;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Update</button>
      </form>
      <button type="button" onClick={() => navigate(`/users/doctors/${id}`)}>
        Back
      </button>
    </>
  );
};

export default UpdateDoctorForm;
