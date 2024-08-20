// Imports
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const DoctorDetails = ({ handleDeleteUser }) => {
  const { id } = useParams();
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
    <>
      <p>
        Full Name: {doctor.firstName} {doctor.lastName}
      </p>
      <p>CPR: {doctor.CPR}</p>
      <p>Contact Number: {doctor.contactNumber}</p>
      <p>Specialization: {doctor.specialization}</p>
      <p>Availability:</p>
      {doctor.availability && Array.isArray(doctor.availability) ? (
        <ul>
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
      <Link to={`/users/doctors/${id}/edit`}>
        <button type="button">Edit</button>
      </Link>
      <button
        type="button"
        onClick={() => {
          handleDeleteUser(userType, id);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default DoctorDetails;
