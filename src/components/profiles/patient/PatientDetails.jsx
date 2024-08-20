// Imports
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Services
import patientServices from "../../services/patientServices";

const PatientDetails = ({ handleDeleteUser }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState("");
  const [userType, setUserType] = useState("patients");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await patientServices.fetchPatient(id);
        const formattedDOB = patientData.DOB
          ? new Date(patientData.DOB).toISOString().split("T")[0]
          : "Not available";
        setPatient({
          ...patientData,
          DOB: formattedDOB,
        });
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
      <p>Date of Birth: {patient.DOB}</p>
      <Link to={`/users/patients/${id}/edit`}>
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

export default PatientDetails;
