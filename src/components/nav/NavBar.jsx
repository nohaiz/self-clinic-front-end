import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/users/sign-in">Sign In</Link>
      <Link to="/users/sign-up">Sign Up</Link>
    </>
  );
};

export default NavBar;
