import "../auth/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../services/authServices";

const SignInForm = (prop) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const { email, password } = formData;

    if (!email.trim()) errors.email = "Email is required.";
    if (!password || password.length < 8)
      errors.password = "Password must be at least 8 characters long.";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setErrors({});
      const response = await authServices.signin(formData);
      prop.setUser(response);
      if (response.error || response.message) {
        setErrors({ general: "User data entry invalid. Please try again." });
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrors({
        general: "User data entry invalid. Please try again.",
      });
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  const { email, password } = formData;

  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered is-vcentered">
            <div className="column is-8-tablet is-6-desktop is-5-widescreen">
              <div className="box" style={{ minHeight: '400px' }}>
                <h1 className="title has-text-centered">Sign In</h1>
                <form onSubmit={handleSubmit}>
                  {errors.general && <div className="notification is-danger">{errors.general}</div>}

                  <div className="field">
                    <label className="label" htmlFor="email">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`input ${errors.email ? "is-danger" : ""}`}
                        placeholder="e.g. alexsmith@gmail.com"
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email && <p className="help is-danger">{errors.email}</p>}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="password">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={`input ${errors.password ? "is-danger" : ""}`}
                        placeholder="********"
                        value={password}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.password && <p className="help is-danger">{errors.password}</p>}
                  </div>

                  <div className="field">
                    <button type="submit" className="button is-primary is-fullwidth">Sign In</button>
                  </div>

                  <div className="field">
                    <button type="button" className="button is-link is-fullwidth" onClick={() => navigate("/")}>Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
