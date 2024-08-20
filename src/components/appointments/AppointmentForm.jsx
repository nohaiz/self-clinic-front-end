import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import offeredServices from "../services/service";
import appointmentServices from "../services/appointmentServices";
import patientServices from "../services/patientServices";
import doctorServices from "../services/doctorServices";
const AppointmentForm = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    service: "",
    doctor: "",
    patient: "",
    status: "",
    notes: "",
  });
  const [services, setServices] = useState({});
  const [doctors, setDoctors] = useState({});
  const [patients, setPatients] = useState({});
  const [errors, setErrors] = useState({});

  const fetchAppointmentData = async () => {
    if (id) {
      const data = await appointmentServices.fetchAppointment(id);
      setFormData({...data,date:data.date.split("T")[0],patient:data.patient._id,doctor:data.doctor._id,service:data.service._id});
    }
  };
  const fetchServices = async () => {
    const data = await offeredServices.indexAllServices();
    if (data.services) setServices(data.services);
  };
  const fetchDoctors = async () => {
    const data = await doctorServices.indexAllDoctors();
    if (data) setDoctors(data);
  };
  const fetchPatients = async () => {
    const data = await patientServices.indexAllPatients();
    if (data) setPatients(data);
  };

  console.log(services);

  useEffect(() => {
    fetchServices();
    fetchDoctors();
    fetchPatients();
    fetchAppointmentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      try {
        setErrors({});
        const response = await appointmentServices.updateAppointment(
          id,
          formData
        );
        if (response.error) {
          setErrors({
            general: "Appointment data entry invalid. Please try again.",
          });
        } else {
          navigate(`/appointments/`);
        }
      } catch (error) {
        console.log(error);
        setErrors({
          general: "Appointment data entry invalid. Please try again.",
        });
      }
    } else {
      try {
        setErrors({});
        const response = await appointmentServices.createAppointment({
          ...formData,
          user: user.type.hasOwnProperty(2000)
            ? user.type[2000]
            : user.type[5000],
        });

        if (response.error) {
          setErrors({
            general: "Appointment data entry invalid. Please try again.",
          });
        } else {
          navigate("/appointments");
        }
      } catch (error) {
        console.log(error);

        setErrors({
          general: "Appointment data entry invalid. Please try again.",
        });
      }
    }
    setFormData({
      date: "",
      startTime: "",
      endTime: "",
      service: "",
      doctor: "",
      patient: "",
      status: "",
      notes: "",
    });
  };

  const { date, startTime, endTime, service, doctor, patient, status, notes } =
    formData;

  return (
    <>
      <h1>{id ? "Update Appointment " : "Create Appointment"}</h1>
      <form onSubmit={handleSubmit}>
        {errors.general && <p>{errors.general}</p>}

        <>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleChange}
          />
          {errors.date && <p className="error">{errors.date}</p>}

          <label htmlFor="startTime">Start Time</label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={startTime}
            onChange={handleChange}
          />
          {errors.startTime && <p className="error">{errors.startTime}</p>}

          <label htmlFor="endTime">End Time</label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            value={endTime}
            onChange={handleChange}
          />
          {errors.endTime && <p className="error">{errors.endTime}</p>}

          <label htmlFor="service">Service</label>
          <select
            name="service"
            id="service"
            value={service}
            onChange={handleChange}
          >
            <option disabled selected value="">Select Service</option>
            {services.length > 0 &&
              services.map((service) => (
                <option key={service._id} value={service._id}>{service.name}</option>
              ))}
          </select>
          {errors.service && <p className="error">{errors.service}</p>}

          <label htmlFor="doctor">Doctor</label>
          <select
            name="doctor"
            id="doctor"
            value={doctor}
            onChange={handleChange}
          >
            <option  value="">Select Doctor</option>
            {doctors.length > 0 &&
              doctors.map((doc) => <option key={doc._id} value={doc._id}>{doc.firstName} {doc.lastName}</option>)}
          </select>
          {errors.doctor && <p className="error">{errors.doctor}</p>}

          <label htmlFor="patient">Patient</label>
          <select
            type="text"
            name="patient"
            id="patient"
            value={patient}
            onChange={handleChange}
          >
            <option  value="">Select Patient</option>
            {patients.length > 0 &&
              patients.map((patient) => (
                <option key={patient._id} value={patient._id}>{patient.firstName} {patient.lastName}</option>
              ))}
          </select>
          {errors.patient && <p className="error">{errors.patient}</p>}

          <label htmlFor="status">Status</label>
          <select
            type="text"
            name="status"
            id="status"
            value={status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="camcelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="error">{errors.status}</p>}

          <label htmlFor="notes">Notes</label>
          <input
            type="text"
            name="notes"
            id="notes"
            value={notes}
            onChange={handleChange}
          />
          {errors.notes && <p className="error">{errors.notes}</p>}
        </>

        <button type="submit">{id ? `Update` : "Create"}</button>
      </form>

      <button type="button" onClick={() => navigate("/appointments")}>
        {" "}
        Back
      </button>
    </>
  );
};

export default AppointmentForm;
