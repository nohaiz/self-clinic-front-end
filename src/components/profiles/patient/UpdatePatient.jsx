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
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const genderOptions = ["male", "female"];

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

  const validateForm = () => {
    const errors = {};
    const { firstName, lastName, CPR, contactNumber, DOB, gender } = formData;
    if (!firstName || !/^[A-Za-z]+$/.test(firstName))
      errors.firstName = "First name must contain only letters.";
    if (!lastName || !/^[A-Za-z]+$/.test(lastName))
      errors.lastName = "Last name must contain only letters.";
    if (!CPR || CPR.toString().length !== 9)
      errors.CPR = "CPR must be 9 digits long.";
    if (!contactNumber || contactNumber.length !== 8)
      errors.contactNumber = "Contact number must be 8 digits long.";
    if (!DOB || new Date(DOB) > Date.now())
      errors.DOB = "Date of birth cannot be a future date.";
    if (!gender) errors.gender = "Gender is required.";

    setErrors(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await patientServices.updatePatient(id, formData);
      navigate(`/users/patients/${id}`);
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
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
          type="number"
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
        <label htmlFor="DOB">Date of Birth</label>
        <input
          type="date"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
        />
        {errors.DOB && <p>{errors.DOB}</p>}
        <label htmlFor="gender">Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        {errors.gender && <p>{errors.gender}</p>}

        <button type="submit">Update</button>
      </form>
      <button type="button" onClick={() => navigate(`/users/patients/${id}`)}>
        Back
      </button>
    </>
  );
};

export default UpdatePatientForm;
