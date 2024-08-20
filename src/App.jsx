import "./App.css";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

// IMPORTED MODULES

import NavBar from "./components/nav/NavBar";

// SERVICES
import authServices from "./components/services/authServices";
import adminServices from "./components/services/adminServices";

// PUBLIC ROUTES
import SignInFrom from "./components/auth/SignInForm";
import SignUpFrom from "./components/auth/SignUpForm";
import Landing from "./components/landing/Landing";
import AdminDetails from "./components/profiles/admin/AdminDetails";
import AdminCreateForm from "./components/profiles/admin/AdminCreateForm";
import ManageUsers from "./components/profiles/admin/ManageUser";
import PatientDetails from "./components/profiles/patient/PatientDetails";
import UpdatePatientForm from "./components/profiles/patient/UpdatePatient";
import DoctorDetails from "./components/profiles/doctor/DoctorDetails";
import UpdateDoctorForm from "./components/profiles/doctor/UpdateDoctor";
import patientServices from "./components/services/patientServices";
import doctorServices from "./components/services/doctorServices";
// PRIVATE ROUTES
import DashBoard from "./components/dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(authServices.getUser());
  const navigate = useNavigate();

  const handleSignout = () => {
    authServices.signout();
    setUser(null);
  };

  const handleDeleteUser = async (userType, id) => {
    try {
      if (userType === "admins") {
        await adminServices.deleteAdmin(userType, id);
        if (user.type[2000] === id) {
          handleSignout();
          navigate("/");
        }
      }
      if (userType === "patients") {
        await patientServices.deletePatient(userType, id);
        if (user.type[3000] === id) {
          handleSignout();
          navigate("/");
        }
      }
      if (userType === "doctors") {
        await doctorServices.deleteDoctor(userType, id);
        if (user.type[5000] === id) {
          handleSignout();
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDeletePatient = async (userType, id) => {
  //   try {
  //     if (userType === "patients") {
  //       await patientServices.deletePatient(userType, id);
  //       if (user.type[3000] === id) {
  //         handleSignout();
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDeleteDoctor = async (userType, id) => {
  //   try {
  //     if (userType === "doctors") {
  //       await doctorServices.deleteDoctor(userType, id);
  //       if (user.type[5000] === id) {
  //         handleSignout();
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          // PRIVATE ROUTES
          <>
            <Route path="/" element={<DashBoard user={user} />} />

            {user.type.hasOwnProperty(2000) ? (
              <>
                <Route
                  path={`/users/admins/:id`}
                  element={<AdminDetails handleDeleteUser={handleDeleteUser} />}
                ></Route>
                <Route
                  path="/users/admins"
                  element={<AdminCreateForm user={user} />}
                ></Route>
                <Route
                  path={`/users/admins/:id/edit`}
                  element={<AdminCreateForm />}
                ></Route>
                <Route
                  path="/users"
                  element={
                    <ManageUsers
                      user={user}
                      handleDeleteUser={handleDeleteUser}
                    />
                  }
                ></Route>
              </>
            ) : (
              <></>
            )}

            {user.type.hasOwnProperty(3000) ? (
              <>
                <Route
                  path={`/users/patients/:id`}
                  element={
                    <PatientDetails handleDeleteUser={handleDeleteUser} />
                  }
                />
                <Route
                  path={`/users/patients/:id/edit`}
                  element={<UpdatePatientForm />}
                />
              </>
            ) : (
              <></>
            )}

            {user.type.hasOwnProperty(5000) ? (
              <>
                <Route
                  path={`/users/doctors/:id`}
                  element={
                    <DoctorDetails handleDeleteUser={handleDeleteUser} />
                  }
                ></Route>
                <Route
                  path={`/users/doctors/:id/edit`}
                  element={<UpdateDoctorForm />}
                ></Route>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          // PUBLIC ROUTES
          <>
            <Route path="/" element={<Landing />} />
            <Route
              path="/users/sign-in"
              element={<SignInFrom setUser={setUser} />}
            />
            <Route
              path="/users/sign-up"
              element={<SignUpFrom setUser={setUser} />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
