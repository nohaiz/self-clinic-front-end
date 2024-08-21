import "../admin/admin.css"

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import adminServices from "../../services/adminServices";

const AdminDetails = ({ handleDeleteUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="container">
      <div className="box">
        <div className="content">
          <p className="title is-2 is-spaced">
            {userAdmin.firstName} {userAdmin.lastName}
          </p>
          <p className="subtitle is-6">CPR: {userAdmin.CPR}</p>
          <p className="subtitle is-6">Contact Number: {userAdmin.contactNumber}</p>
        </div>

        <div className="buttons mt-4">
          <Link to={`/users/admins/${id}/edit`}>
            <button className="button is-primary ">Edit Profile</button>
          </Link>

          <Link to="/users">
            <button className="button is-info">Manage Users</button>
          </Link>

          <button
            className="button is-danger"
            type="button"
            onClick={() => handleDeleteUser(userType, id)}
          >
            Delete Profile
          </button>

        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
