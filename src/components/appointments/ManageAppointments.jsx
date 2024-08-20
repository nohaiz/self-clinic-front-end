import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import appointmentService from "../services/appointmentServices";

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
      const choice=confirm("Are you sure you want to delete this appointment?");
      if(!choice) return;

      await appointmentService.deleteAppointment(id);
      fetchAppointments();
    } catch (error) {
      console.log("Error deleting service: ", error);
    }
  };
  return (
    <div>
      <div>
        {data ? (
          <div>
            {data.map((appointment, index) => (
              <div key={index}>
                {appointment.startTime} - {appointment.endTime} Doctor {appointment.doctor.firstName} - Patient {appointment.patient.firstName}{"  "}
                {(user.type.hasOwnProperty(2000) ||
                  user.type.hasOwnProperty(5000)) && (
                  <>
                    <button onClick={()=>navigate(`/appointments/${appointment._id}`)}>Edit</button>
                    <button onClick={() => handleDeleteService(appointment._id)}>
                      Delete
                    </button>{" "}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
        {(user.type.hasOwnProperty(2000) || user.type.hasOwnProperty(5000)) && (
          <Link to="/appointments/create">Create Appointment</Link>
        )}
      </div>
    </div>
  );
};

export default ManageAppointments;
