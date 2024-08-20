import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import adminServices from "../../services/adminServices";

const AdminDetails = ({ handleDeleteUser }) => {
  const { id } = useParams();
  const [userAdmin, setUserAdmin] = useState("");
  const [userType, setUserType] = useState("admins");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await adminServices.fetchAdmin(id);
        setUserAdmin(adminData);
      } catch (error) {
        console.log("Error fetching admin data: ", error);
      }
    };
    fetchAdmin();
  }, [id]);

  return (
    <>
      <p>
        Full Name: {userAdmin.firstName} {userAdmin.lastName}
      </p>
      <p>CPR: {userAdmin.CPR}</p>
      <p>Contact Number: {userAdmin.contactNumber}</p>

      <Link to={`/users/admins/${id}/edit`}>
        <button type="button">Edit</button>
      </Link>

      <button
        type="button"
        onClick={() => {
          handleDeleteUser(userType, id);
        }}
      >
        Delete
      </button>

      <Link to="/users/admins">
        <button type="button">Create</button>
      </Link>

      <Link to="/users">
        <button type="button">Manage Users</button>
      </Link>
      {/* remove this button before merging */}
      <Link to="/users/doctors">
        <button type="button">Create Doctor</button>
      </Link>
    </>
  );
};

export default AdminDetails;
