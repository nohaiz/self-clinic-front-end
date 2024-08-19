import { useEffect, useState } from "react";
import patientServices from "../../services/patientServices";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const UpdatePatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    CPR: 0,
    contactNumber: "",
    DOB: "",
  });
  useEffect(() => {
    const getPatient = async () => {
      try {
        const patientData = await patientServices.fetchPatient(id);
        setFormData(patientData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    getPatient();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientServices.updatePatient(id, formData);
      navigate(`/users/patients/${id}`);
    } catch (error) {
      console.error("Error updating patient data:", error);
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
        type="number"
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
      <label htmlFor="DOB">Date of Birth</label>
      <input
        type="date"
        name="DOB"
        value={formData.DOB}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdatePatientForm;
