// Imports
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../patient/patient.css";
// Services
import patientServices from "../../services/patientServices";

const PatientDetails = ({ handleDeleteUser, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="container">
      <div className="box">
        <div className="content">
          <p className="title is-2 is-spaced">
            {patient.firstName} {patient.lastName}
          </p>
          <p className="subtitle is-6">CPR: {patient.CPR}</p>
          <p className="subtitle is-6">
            Contact Number: {patient.contactNumber}
          </p>
          <p className="subtitle is-6">Date of Birth: {patient.DOB}</p>
          <p className="subtitle is-6">Gender: {patient.gender}</p>
        </div>

        <div className="buttons mt-4">
          <Link to={`/users/patients/${id}/edit`}>
            <button className="button is-primary">Edit</button>
          </Link>
          {user.type && user.type[3000] === id || user.type.hasOwnProperty(2000) ? (
            <>
              <button
                className="button is-danger"
                type="button"
                onClick={() => handleDeleteUser(userType, id)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="button is-info"
                type="button"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
