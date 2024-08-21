import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import appointmentService from "../services/appointmentServices";
import "./appointment.css";
const ManageAppointments = ({ user }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const fetchedData = await appointmentService.indexAllAppointments();
      setData(fetchedData.appointments);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDeleteService = async (id) => {
    try {

      await appointmentService.deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.log("Error deleting service: ", error);
    }
  };
  return (
    <div className="section is-small">
      <div className="box background-white">
      <div className="columns is-vcentered mb-4">
          <div className="column is-12">
            <div className="buttons custom-placement">
              <button
                className="button custom-button"
              >
                Appointments
              </button>
                <Link to="/appointments/create">
                  <button className="button custom-button-create">+</button>
                </Link>
           
            </div>
          </div>
        </div>
        <p className="user-type-title">Appointments</p>
        <div>
          {data ? (
            <div>
              {data.map((appointment, index) => (
                <div key={index} className="column">
                  <div className="box" style={{ backgroundColor: "#f0f0f0" }}>
                    <div
                      className="is-flex is-justify-content-space-between "
                      style={{ color: "hsl(0, 0%, 71%)" }}
                    >
                      <div>
                      <ul>
                        Patient: {appointment?.patient?.firstName}
                        </ul>
                        <li>{appointment.date.split("T")[0]} </li>
                        <li>
                          {appointment.startTime} - {appointment.endTime}
                        </li>
                        <li>Service: {appointment.service.name}</li>
                        <li>Status: {appointment.status}</li>
                        <li>
                        Doctor: {appointment?.doctor?.firstName}
                        </li>
                       
                      </div>
                      {(user.type.hasOwnProperty(2000) ||
                    user.type.hasOwnProperty(5000)) && (
                    <div>
                      <button
                        onClick={() =>
                          navigate(`/users/patients/${appointment.patient._id}`)
                        }
                         className="button mr-2"
                      >
                        View Patient
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/appointments/${appointment._id}`)
                        }
                         className="button mr-2"
                      >
                        Edit
                      </button>
                      <button
                       className="button is-danger"
                        onClick={() => handleDeleteService(appointment._id)}
                      >
                        Delete
                      </button>{" "}
                    </div>
                  )}
                    </div>
                  </div>

                 
                </div>
              ))}
            </div>
          ) : (
            <p>No data available</p>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
