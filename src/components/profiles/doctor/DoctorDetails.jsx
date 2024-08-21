// Imports
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./doctor.css";
// Services
import doctorServices from "../../services/doctorServices";

const formatTimeTo12Hour = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

const DoctorDetails = ({ handleDeleteUser, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState("");
  const [userType, setUserType] = useState("doctors");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctorData = await doctorServices.fetchDoctor(id);
        setDoctor(doctorData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctor();
  }, [id]);
  return (
    <div className="container">
      <div className="box">
        <p className="title is-2 is-spaced">
          {doctor.firstName} {doctor.lastName}
        </p>

        <div className="content">
          <p className="subtitle is-6">CPR: {doctor.CPR}</p>
          <p className="subtitle is-6">
            Contact Number: {doctor.contactNumber}
          </p>
          <p className="subtitle is-6">
            Specialization: {doctor.specialization}
          </p>
          <p className="subtitle is-6">Availability:</p>
          {doctor.availability && Array.isArray(doctor.availability) ? (
            <ul className="availability-list">
              {doctor.availability.map((slot, index) => (
                <li key={index}>
                  {slot.day}: {formatTimeTo12Hour(slot.startTime)} -{" "}
                  {formatTimeTo12Hour(slot.endTime)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No availability information available.</p>
          )}
        </div>

        <div className="buttons mt-4">
          <Link to={`/users/doctors/${id}/edit`}>
            <button className="button is-primary">Edit</button>
          </Link>

          {!user.type.hasOwnProperty(2000) && (
            <button
              className="button is-danger"
              type="button"
              onClick={() => handleDeleteUser(userType, id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
