import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import adminServices from "../../services/adminServices";

const ManageUsers = ({ user, handleDeleteUser }) => {
  const { id } = useParams();
  const [userType, setUserType] = useState("admins");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchUser = async () => {
    try {
      const fetchedData = await adminServices.indexAllUser(userType);
      setData(fetchedData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userType]);

  return (
    <div className="full-height-center">
      <div className="box">
        <div className="container mt-5">
          <div className="columns is-vcentered mb-4">
            <div className="column is-12">
              <div className="buttons">
                <button className="button is-primary" onClick={() => setUserType("admins")}>Admins</button>
                <button className="button is-primary" onClick={() => setUserType("patients")}>Patients</button>
                <button className="button is-primary" onClick={() => setUserType("doctors")}>Doctors</button>
              </div>
            </div>
          </div>
          <div className="columns is-multiline">
            {data ? (
              data.map((users, index) => (
                <div key={index} className="column is-4-desktop is-6-tablet">
                  <div className="box">
                    <div className="title is-5">
                      {user.type[2000] === users._id ? (
                        <div hidden="true"></div>
                      ) : (
                        <div>
                          {userType === "doctors" ? (
                            <Link to={`/users/doctors/${users._id}`} className="has-text-link">
                              {`${users.firstName} ${users.lastName}`}
                            </Link>
                          ) : userType === "patients" ? (
                            <Link to={`/users/patients/${users._id}`} className="has-text-link">
                              {`${users.firstName} ${users.lastName}`}
                            </Link>
                          ) : (
                            `${users.firstName} ${users.lastName}`
                          )}
                          <button
                            className="button is-danger is-small mt-2"
                            type="button"
                            onClick={async () => {
                              try {
                                await handleDeleteUser(userType, users._id);
                                await fetchUser();
                              } catch (error) {
                                console.error("Error during delete and fetch: ", error);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="column is-full">
                <p className="has-text-centered">No data available</p>
              </div>
            )}
          </div>
  
          {(userType === "admins" || userType === "doctors") && (
            <div className="columns">
              <div className="column is-full">
                <Link to={`/users/${userType}`}>
                  <button className="button is-primary">Create</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ManageUsers;
