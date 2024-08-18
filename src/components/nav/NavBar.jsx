import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav>
      {user ? (
        // PRIVATE ROUTES
        <>
          <Link>Profile</Link>
          <Link onClick={handleSignout} to="/">
            Sign Out
          </Link>
        </>
      ) : (
        // PUBLIC ROUTES
        <>
          {/* <Link to="/">Home</Link> */}
          <Link to="/users/sign-in">Sign In</Link>
          <Link to="/users/sign-up">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
