import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import service from "../services/service";

const ManageUsers = ({ user }) => {
  const [data, setData] = useState([]);

  const fetchOfferedServices = async () => {
    try {
      const fetchedData = await service.indexAllServices();
      setData(fetchedData.services);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchOfferedServices();
  }, []);

  const handleDeleteService = async (id) => {
    try {
      const choice=confirm("Are you sure you want to delete this service?");
      if(!choice) return;

      await service.deleteService(id);
      fetchOfferedServices();
    } catch (error) {
      console.log("Error deleting service: ", error);
    }
  };
  return (
    <div>
      <div>
        {data ? (
          <div>
            {data.map((service, index) => (
              <div key={index}>
                {service.name}{" "}
                {(user.type.hasOwnProperty(2000) ||
                  user.type.hasOwnProperty(5000)) && (
                  <>
                    <Link to={`/services/${service._id}`}>Edit</Link>
                    <button onClick={() => handleDeleteService(service._id)}>
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
          <Link to="/services/create">Create Service</Link>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
