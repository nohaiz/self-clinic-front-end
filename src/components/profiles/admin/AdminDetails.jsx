import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

import admin from "../../services/admin";

const AdminDetails = ({ user }) => {
  const userId = user.type[2000];
  const [userAdmin, setUserAdmin] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await admin.fetchAdmin(userId);
        setUserAdmin(adminData);
      } catch (error) {
        console.log("Error fetching admin data: ", error);
      }
    };
    fetchAdmin();
  }, [userId]);

  return <p>{userAdmin.firstName}</p>;
};

export default AdminDetails;
