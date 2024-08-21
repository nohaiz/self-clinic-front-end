import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import service from "../services/service";
import "./services.css";

const ServiceForm = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchofferedServiceData = async () => {
      if (id) {
        const data = await service.fetchService(id);
        setFormData(data);
      }
    };
    fetchofferedServiceData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    const errors = {};
    const { name, category } = formData;

    if (!name || !/^[A-Za-z]+$/.test(name))
      errors.name = "Name is required and must contain only letters.";
    if (!category) errors.category = "Category is required.";
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (id) {
      try {
        setErrors({});
        const response = await service.updateService(id, formData);
        if (response.error) {
          setErrors({
            general: "Service data entry invalid. Please try again.",
          });
        } else {
          navigate(`/services/`);
        }
      } catch (error) {
        console.log(error);
        setErrors({
          general: "Service data entry invalid. Please try again.",
        });
      }
    } else {
      try {
        setErrors({});
        const response = await service.createService({
          ...formData,
          user: user.type.hasOwnProperty(2000)
            ? user.type[2000]
            : user.type[5000],
        });

        if (response.error) {
          setErrors({
            general: "Service data entry invalid. Please try again.",
          });
        } else {
          navigate("/services");
        }
      } catch (error) {
        console.log(error);

        setErrors({
          general: "Service data entry invalid. Please try again.",
        });
      }
    }
    setFormData({
      name: "",
      description: "",
      category: "",
    });
  };

  const { name, description, category } = formData;

  return (
    <>
      <div className="custom-form">
        <div className="container ">
          <form
            className="box has-background-white  column is-three-fifths is-offset-one-fifth"
            onSubmit={handleSubmit}
          >
            <p className="title is-2 is-spaced">
              {id ? "Update Service " : "Create Service"}
            </p>
            {errors.general && (
              <div className="notification is-danger">{errors.general}</div>
            )}

            <>
              <div className="field">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <div className="help is-danger">{errors.name}</div>}
              </div>
              <div className="field">
                <label className="label" htmlFor="description">
                  Description
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleChange}
                  />
                </div>
                {errors.description && (
                  <div className="help is-danger">{errors.description}</div>
                )}
              </div>
              <div className="field">
                <label className="label" htmlFor="category">
                  Category
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="category"
                    id="category"
                    value={category}
                    onChange={handleChange}
                  />
                </div>
                {errors.category && <div className="help is-danger">{errors.category}</div>}
              </div>
            </>

            <div className="field">
              <div className="control">
                <button className="button is-primary" type="submit">
                  {id ? `Update` : "Create"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ServiceForm;
