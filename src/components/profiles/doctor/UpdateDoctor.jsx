import { useEffect, useState } from "react";

import doctorServices from "../../services/doctorServices";

import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const UpdateDoctorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    CPR: 0,
    contactNumber: "",
    DOB: "",
    specialization: "",
  });
  useEffect(() => {
    const getDoctor = async () => {
      try {
        const doctorData = await doctorServices.fetchDoctor(id);
        setFormData(doctorData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    getDoctor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <label htmlFor="specialization">Specialization</label>
      <input
        type="text"
        name="specialization"
        value={formData.specialization}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateDoctorForm;
