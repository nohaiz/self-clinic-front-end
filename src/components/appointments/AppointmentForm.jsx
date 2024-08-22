import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import offeredServices from "../services/service";
import appointmentServices from "../services/appointmentServices";
import patientServices from "../services/patientServices";
import doctorServices from "../services/doctorServices";
import "./appointment.css";

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
      setFormData({
        ...data,
        date: data?.date.split("T")[0],
        patient: data?.patient?._id,
        doctor: data?.doctor?._id,
        service: data?.service?._id,
      });
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
  const validateForm = () => {
    const errors = {};
    const {
      date,
      startTime,
      endTime,
      service,
      doctor,
      patient,
      status,
      notes,
    } = formData;
    console.log(date);
    if (!date) {
      errors.date = "Date is required.";
    }
    if (!startTime) errors.startTime = "Start Time is required.";
    if (!endTime) {
      errors.endTime = "Date is required.";
    } else if (startTime && endTime && startTime > endTime) {
      errors.startTime = "Start time cannot be greater than end time.";
    }
    if (!service) errors.service = "Service is required.";
    if (!doctor) errors.doctor = "Doctor is required.";
    if (!status) errors.status = "Status is required.";

    if (
      (user.type.hasOwnProperty(2000) || user.type.hasOwnProperty(5000)) &&
      !patient
    )
      errors.patient = "Patient is required.";
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
          patient:
            !user.type.hasOwnProperty(2000) && !user.type.hasOwnProperty(5000)
              ? user.type[3000]
              : formData.patient,
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
      <div className="custom-form">
        <div className="container ">
          <form
            className="box has-background-white  column is-three-fifths is-offset-one-fifth"
            onSubmit={handleSubmit}
          >
            <p className="title is-2 is-spaced">
              {id ? "Update Appointment " : "Create Appointment"}
            </p>
            {errors.general && (
              <div className="notification is-danger">{errors.general}</div>
            )}

            <div className="field">
              <label className="label" htmlFor="date">
                Date
              </label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.date && <div className="help is-danger">{errors.date}</div>}

            <label className="label" htmlFor="startTime">
              Start Time
            </label>
            <div className="control">
              <input
                className="input"
                type="time"
                name="startTime"
                id="startTime"
                value={startTime}
                onChange={handleChange}
              />
            </div>
            {errors.startTime && (
              <div className="help is-danger">{errors.startTime}</div>
            )}

            <label className="label" htmlFor="endTime">
              End Time
            </label>
            <div className="control">
              <input
                className="input"
                type="time"
                name="endTime"
                id="endTime"
                value={endTime}
                onChange={handleChange}
              />
            </div>
            {errors.endTime && (
              <div className="help is-danger">{errors.endTime}</div>
            )}

            <div className="field">
              <label className="label" htmlFor="service">
                Service
              </label>
              <div className="select w-full">
                <select
                  className="w-full"
                  name="service"
                  id="service"
                  value={service}
                  onChange={handleChange}
                >
                  <option value="">Select Service</option>
                  {services.length > 0 &&
                    services.map((service) => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                </select>
              </div>
              {errors.service && (
                <div className="help is-danger">{errors.service}</div>
              )}
            </div>
            <div className="field">
              <label className="label" htmlFor="doctor">
                Doctor
              </label>
              <div className="select w-full">
                <select
                  className="w-full"
                  name="doctor"
                  id="doctor"
                  value={doctor}
                  onChange={handleChange}
                >
                  <option value="">Select Doctor</option>
                  {doctors.length > 0 &&
                    doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.firstName} {doc.lastName}
                      </option>
                    ))}
                </select>
              </div>
              {errors.doctor && (
                <div className="help is-danger">{errors.doctor}</div>
              )}
            </div>
            {(user.type.hasOwnProperty(2000) ||
              user.type.hasOwnProperty(5000)) && (
                <div className="field">
                  <label className="label" htmlFor="patient">
                    Patient
                  </label>
                  <div className="select w-full">
                    <select
                      className="w-full"
                      name="patient"
                      id="patient"
                      value={patient}
                      onChange={handleChange}
                    >
                      <option value="">Select Patient</option>
                      {patients.length > 0 &&
                        patients.map((patient) => (
                          <option key={patient._id} value={patient._id}>
                            {patient.firstName} {patient.lastName}
                          </option>
                        ))}
                    </select>
                  </div>
                  {errors.patient && (
                    <div className="help is-danger">{errors.patient}</div>
                  )}
                </div>
              )}
            <div className="field">
              <label className="label" htmlFor="status">
                Status
              </label>
              <div className="select w-full">
                <select
                  className="w-full"
                  name="status"
                  id="status"
                  value={status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {errors.status && (
                <div className="help is-danger">{errors.status}</div>
              )}
            </div>

            <label className="label" htmlFor="notes">
              Notes
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="notes"
                id="notes"
                value={notes}
                onChange={handleChange}
              />
            </div>
            {errors.notes && (
              <div className="help is-danger">{errors.notes}</div>
            )}

            <div className="field">
              <div className="control">
                <button className="button is-primary" type="submit">
                  {id ? `Update` : "Create"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
