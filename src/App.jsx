import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";

// IMPORTED MODULES
import SignInFrom from "./components/auth/SignInForm";
import SignUpFrom from "./components/auth/SignUpForm";
import Landing from "./components/landing/Landing";
import NavBar from "./components/nav/NavBar";
import authServices from "./components/services/authServices";
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
