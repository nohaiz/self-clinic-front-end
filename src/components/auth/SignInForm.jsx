import { useState } from "react";

const SignInForm = () => {
  const [formData, setFormData] = useState({});
  return (
    <>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignInForm;
