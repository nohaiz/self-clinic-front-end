import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import service from "../services/service";

const ManageServices = ({ user }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
      <h4>Services</h4>
      <div>
        {data ? (
          <div>
            {data.map((service, index) => (
              <div key={index}>
                {service.name}
                {user.type.hasOwnProperty(2000) && (
                  <>
                    <button onClick={()=>navigate(`/services/${service._id}`)}>Edit</button>
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

export default ManageServices;
