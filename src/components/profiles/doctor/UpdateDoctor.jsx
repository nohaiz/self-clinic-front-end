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
    <div className="custom-update-form">
      <div className="container">
        <div className="box column is-three-fifths is-offset-one-fifth">
          <p className="title is-2">Update Doctor Details</p>
          <form onSubmit={handleSubmit}>
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
                  className={`input ${
                    errors.specialization ? "is-danger" : ""
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

            <p className="title is-4">Availability</p>
            {formData.availability.map((slot, index) => (
              <div className="box" key={index}>
                <div className="field">
                  <label className="label" htmlFor={`day-${index}`}>
                    Day
                  </label>
                  <div className="control">
                    <input
                      className={`input ${
                        errors[`availabilityDay${index}`] ? "is-danger" : ""
                      }`}
                      type="text"
                      name="day"
                      id={`day-${index}`}
                      value={slot.day}
                      onChange={(e) => handleAvailabilityChange(index, e)}
                    />
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
                      className={`input ${
                        errors[`availabilityStartTime${index}`]
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
                      className={`input ${
                        errors[`availabilityEndTime${index}`] ? "is-danger" : ""
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
            <div className="field">
              <button
                type="button"
                className="button is-primary"
                onClick={addAvailabilitySlot}
              >
                Add Availability Slot
              </button>
            </div>

            <div className="field">
              <button type="submit" className="button is-link">
                Update
              </button>
              <button
                type="button"
                className="button is-light"
                onClick={() => navigate(`/users/doctors/${id}`)}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDoctorForm;
