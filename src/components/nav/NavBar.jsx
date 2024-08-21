import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav className="navbar is-link is-fixed-top">
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item custom-logo" to="/">
            Self Clinic
          </Link>
          {user ? (
            <>
              {user.type.hasOwnProperty(2000) && (
                <Link className="navbar-item is-info" to={`/users/admins/${user.type[2000]}`}>
                  Admin Profile
                </Link>
              )}
              {user.type.hasOwnProperty(3000) && (
                <Link className="navbar-item" to={`/users/patients/${user.type[3000]}`}>
                  Patient Profile
                </Link>
              )}
              {user.type.hasOwnProperty(5000) && (
                <Link className="navbar-item" to={`/users/doctors/${user.type[5000]}`}>
                  Doctor Profile
                </Link>
              )}
              <Link className="navbar-item" to="/services">
                Services
              </Link>
              <Link className="navbar-item" to="/appointments">
                Appointments
              </Link>
            </>
          ) : null}
        </div>

        <div className="navbar-end">
          {!user ? (
            <>
            <div className="custom-sign-in-sign-out">
              <Link className="navbar-item" to="/users/sign-in">
                Sign In
              </Link>
              <Link className="navbar-item" to="/users/sign-up">
                Sign Up
              </Link>
              </div>
            </>
          ) : (
            <a className="navbar-item" onClick={handleSignout} href="/">
              Sign Out
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
