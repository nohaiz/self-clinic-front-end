const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const indexAllDoctors = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/doctors`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const createDoctor = async (formData) => {
  console.log("formData", formData);
  try {
    const res = await fetch(`${BACKEND_URL}/users/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    console.log("json", json);
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const fetchDoctor = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/doctors/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const updateDoctor = async (id, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/doctors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const deleteDoctor = async (userType, id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userType}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

export default {
  fetchDoctor,
  updateDoctor,
  deleteDoctor,
  indexAllDoctors,
  createDoctor,
};
