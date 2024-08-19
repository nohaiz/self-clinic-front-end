import { useState, useEffect } from "react";

import adminServices from "../../services/adminServices";

const ManageUsers = ({ user, handleDeleteUser }) => {
  const [userType, setUserType] = useState("admins");
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
                    <>
                      <span>List of users:</span>
                    </>
                  ) : (
                    <>
                      {`${users.firstName} ${users.lastName}`}
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await handleDeleteUser(userType, users._id); // Await the deletion
                            await fetchUser(); // Fetch updated user list after deletion
                          } catch (error) {
                            console.error(
                              "Error during delete and fetch: ",
                              error
                            ); // Handle errors
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
