// Imports
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Services
import patientServices from "../../services/patientServices";

const PatientDetails = ({ handleDeletePatient }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState("");
  // const [userType, setUserType] = useState("patients");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await patientServices.fetchPatient(id);
        setPatient(patientData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatient();
  }, [id]);

  return (
    <>
      <p>
        Full Name: {patient.firstName} {patient.lastName}
      </p>
      <p>CPR: {patient.CPR}</p>
      <p>Contact Number: {patient.contactNumber}</p>
      <Link to={`/users/patients/${id}/edit`}>
        <button type="button">Edit</button>
      </Link>
      <button
        type="button"
        onClick={() => {
          handleDeletePatient("patients", id);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default PatientDetails;
