import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import service from "../services/service";
import "./services.css";

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
      await service.deleteService(id);
      fetchOfferedServices();
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
              {user.type.hasOwnProperty(2000) ? (
                <Link to="/services/create">
                  <button className="button custom-button ">Service +</button>
                </Link>
              ) : <div className=" custom-button">Services</div>}
            </div>
          </div>
        </div>
        <div>
          {data ? (
            <div>
              {data.map((service, index) => (
                <div key={index} className="column">
                  <div className="box" style={{ backgroundColor: "#f0f0f0" }}>
                    <div
                      className="is-flex is-justify-content-space-between "
                      style={{ color: "hsl(0, 0%, 71%)" }}
                    >
                      <div>
                        <ul>{service.name}</ul>
                        <li>{service.description}</li>
                        <li>{service.category}</li>
                      </div>

                      {user.type.hasOwnProperty(2000) && (
                        <div className="custom-button-placement">
                          <button
                            className="button mr-2 is-primary"
                            onClick={() => navigate(`/services/${service._id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="button is-danger"
                            onClick={() => handleDeleteService(service._id)}
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

export default ManageServices;
