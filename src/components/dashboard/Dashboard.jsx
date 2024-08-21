import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <>
      <h1>This Dashboard</h1>
      <Link to={`/services`}>Services</Link>
      <Link to={`/appointments`}>Appointments</Link>
    </>
  );
};

export default DashBoard;
