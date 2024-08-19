import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import admin from "../../services/admin";

const AdminDetails = () => {
  const { id } = useParams();
  const [userAdmin, setUserAdmin] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const adminData = await admin.fetchAdmin(id);
        setUserAdmin(adminData);
      } catch (error) {
        console.log("Error fetching admin data: ", error);
      }
    };
    fetchAdmin();
  }, [id]);

  return <p>{userAdmin.firstName}</p>;
};

export default AdminDetails;
