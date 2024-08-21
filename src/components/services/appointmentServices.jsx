const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;


const createAppointment = async(formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/appointments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
}

const indexAllAppointments = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/appointments`, {
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

const fetchAppointment = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/appointments/${id}`, {
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

const updateAppointment = async (id, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/appointments/${id}`, {
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

const deleteAppointment = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/appointments/${id}`, {
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

export default { createAppointment,fetchAppointment, updateAppointment, deleteAppointment, indexAllAppointments };
