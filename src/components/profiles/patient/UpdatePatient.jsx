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
        setFormData({ ...patientData, DOB: patientData.DOB.split("T")[0] });
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
    <div className="custom-form">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="box column is-three-fifths is-offset-one-fifth"
        >
          <p className="title is-2 is-spaced">Update Patient Profile</p>

          <div className="field">
            <label className="label" htmlFor="firstName">
              First Name
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="firstName"
                id="firstName"
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
                className="input"
                type="text"
                name="lastName"
                id="lastName"
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
                className="input"
                type="number"
                name="CPR"
                id="CPR"
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
                className="input"
                type="text"
                name="contactNumber"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            {errors.contactNumber && (
              <p className="help is-danger">{errors.contactNumber}</p>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="DOB">
              Date of Birth
            </label>
            <div className="control">
              <input
                className="input"
                type="date"
                name="DOB"
                id="DOB"
                value={formData.DOB}
                onChange={handleChange}
              />
            </div>
            {errors.DOB && <p className="help is-danger">{errors.DOB}</p>}
          </div>

          <div className="field">
            <label className="label" htmlFor="gender">
              Gender
            </label>
            <div className="control">
              <div className="select">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.gender && <p className="help is-danger">{errors.gender}</p>}
          </div>

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Update
              </button>
            </div>
          </div>
        </form>

        <button
          className="button is-info"
          type="button"
          onClick={() => navigate(`/users/patients/${id}`)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UpdatePatientForm;
