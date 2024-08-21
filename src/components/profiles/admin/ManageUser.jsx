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
    <div className="section is-small">
      <div className="box has-background-white">
        <div className="columns is-vcentered mb-4">
          <div className="column is-12">
            <div className="buttons custom-placement">
              <button
                className="button custom-button"
                onClick={() => setUserType("admins")}
              >
                Admins
              </button>
              <button
                className="button custom-button"
                onClick={() => setUserType("patients")}
              >
                Patients
              </button>
              <button
                className="button custom-button"
                onClick={() => setUserType("doctors")}
              >
                Doctors
              </button>
              {(userType === "admins" || userType === "doctors") && (
                <Link to={`/users/${userType}`}>
                  <button className="button custom-button-create">
                    {userType.charAt(0).toUpperCase() + userType.slice(1)}+
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <p className="user-type-title">
          {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </p>
        {data.length > 0 ? (
          data.map(
            (users, index) =>
              user.type[2000] !== users._id && (
                <div key={index} className="column">
                  <div className="box" style={{ backgroundColor: "#f0f0f0" }}>
                    <div className="title is-5">
                      <div
                        className="custom-content"
                        style={{ color: "hsl(0, 0%, 71%)" }}
                      >
                        {userType === "doctors" ? (
                          <Link
                            to={`/users/doctors/${users._id}`}
                            className="link-dark"
                          >
                            {`${users.firstName} ${users.lastName}`}
                          </Link>
                        ) : userType === "patients" ? (
                          <Link
                            to={`/users/patients/${users._id}`}
                            className="link-dark"
                          >
                            {`${users.firstName} ${users.lastName}`}
                          </Link>
                        ) : (
                          `${users.firstName} ${users.lastName}`
                        )}
                        <button
                          className="button is-danger"
                          type="button"
                          onClick={async () => {
                            try {
                              await handleDeleteUser(userType, users._id);
                              await fetchUser();
                            } catch (error) {
                              console.error(
                                "Error during delete and fetch: ",
                                error
                              );
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <div className="column is-full">
            <p className="has-text-centered">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
