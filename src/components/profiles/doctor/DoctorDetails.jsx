// Imports
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Services
import doctorServices from "../../services/doctorServices";

const DoctorDetails = ({ handleDeleteUser, user }) => {
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
      <Link to={`/users/doctors/${id}/edit`}>
        <button type="button">Edit</button>
      </Link>

      {user.type.hasOwnProperty(2000) ? <></> : 
        <button
        type="button" onClick={() => { handleDeleteUser(userType, id)}}>
        Delete 
        </button>}
    </>
  );
};

export default DoctorDetails;
