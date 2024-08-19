import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// IMPORTED MODULES

import NavBar from "./components/nav/NavBar";

// SERVICES
import authServices from "./components/services/authServices";

// PUBLIC ROUTES
import SignInFrom from "./components/auth/SignInForm";
import SignUpFrom from "./components/auth/SignUpForm";
import Landing from "./components/landing/Landing";
import AdminDetails from "./components/profiles/admin/AdminDetails";

// PRIVATE ROUTES
import DashBoard from "./components/dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(authServices.getUser());

  const handleSignout = () => {
    authServices.signout();
    setUser(null);
  };
  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          // PRIVATE ROUTES
          <>
            <Route path="/" element={<DashBoard user={user} />} />

            {user.type.hasOwnProperty(2000) ? (
              <Route
                path={`/users/admins/${user.type[2000]}`}
                element={<AdminDetails user={user} />}
              ></Route>
            ) : (
              <></>
            )}

            {user.type.hasOwnProperty(3000) ? (
              <Route
                path={`/users/profiles/${user.type[3000]}`}
                element={<></>}
              ></Route>
            ) : (
              <></>
            )}

            {user.type.hasOwnProperty(5000) ? (
              <Route
                path={`/users/profiles/${user.type[5000]}`}
                element={<></>}
              ></Route>
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
