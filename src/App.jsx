import "./App.css";

// IMPORTED MODULES
import { Route, Routes } from "react-router-dom";
import SignInFrom from "./components/auth/SignInForm";
import SignUpFrom from "./components/auth/SignUpForm";
import Landing from "./components/landing/Landing";
import NavBar from "./components/nav/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/users/sign-in" element={<SignInFrom />} />
        <Route path="/users/sign-up" element={<SignUpFrom />} />
      </Routes>
    </>
  );
}

export default App;
