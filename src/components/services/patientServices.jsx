const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const indexAllPatients = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/patients`, {
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

const fetchPatient = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/patients/${id}`, {
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

const updatePatient = async (id, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/patients/${id}`, {
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

const deletePatient = async (userType, id) => {
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

export default { fetchPatient, updatePatient, deletePatient, indexAllPatients };
