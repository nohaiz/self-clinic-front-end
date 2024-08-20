import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import service from "../services/service";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (id) {
      try {
        setErrors({});
        const response = await service.updateService( id,formData,);
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
      <h1>{id ? "Update Service " : "Create Service"}</h1>
      <form onSubmit={handleSubmit}>
        {errors.general && <p>{errors.general}</p>}

        <>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}

          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={handleChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}
        </>

        <button type="submit">{id ? `Update` : "Create"}</button>
      </form>

      <button type="button" onClick={() => navigate("/services")}>
        {" "}
        Back
      </button>
    </>
  );
};

export default ServiceForm;
