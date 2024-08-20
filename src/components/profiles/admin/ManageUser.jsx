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
    <div>
      <div>
        <button onClick={() => setUserType("admins")}>Admins</button>
        <button onClick={() => setUserType("patients")}>Patients</button>
        <button onClick={() => setUserType("doctors")}>Doctors</button>
      </div>

      <div>
        {data ? (
          <div>
            {data.map((users, index) => (
              <div key={index}>
                <p>
                  {user.type[2000] === users._id ? (
                    <></>
                  ) : (
                    <div>
                      {userType === "doctors" ? (
                        <Link to={`/users/doctors/${users._id}`}>
                          {`${users.firstName} ${users.lastName}`}
                        </Link>
                      ) : userType === "patients" ? (
                        <Link to={`/users/patients/${users._id}`}>
                          {`${users.firstName} ${users.lastName}`}
                        </Link>
                      ) : (
                        `${users.firstName} ${users.lastName}`
                      )}
                      <button
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
                        {" "}
                        Delete{" "}
                      </button>
                    </div>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
        {userType === "admins" || userType === "doctors" ? (
          userType === "admins" ? (
            <Link to="/users/admins">
              <button type="button">Create</button>
            </Link>
          ) : (
            <Link to="/users/doctors">
              <button type="button">Create</button>
            </Link>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
