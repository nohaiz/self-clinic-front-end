import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav>
      {user ? (
        // PRIVATE ROUTES
        <>
          {user.type.hasOwnProperty(2000) ? (
            <Link to={`/users/admins/${user.type[2000]}`}>Admin Profile</Link>
          ) : (
            <></>
          )}
          {user.type.hasOwnProperty(3000) ? (
            <Link to={`/users/patients/${user.type[3000]}`}>
              Patient Profile
            </Link>
          ) : (
            <></>
          )}
          {user.type.hasOwnProperty(5000) ? (
            <Link to={`/users/doctors/${user.type[5000]}`}>Doctor Profile</Link>
          ) : (
            <></>
          )}
          <Link onClick={handleSignout} to="/">
            Sign Out
          </Link>
        </>
      ) : (
        // PUBLIC ROUTES
        <>
          <Link to="/">Home</Link>
          <Link to="/users/sign-in">Sign In</Link>
          <Link to="/users/sign-up">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
