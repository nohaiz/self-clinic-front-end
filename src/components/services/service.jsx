const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;


const createService = async(formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/services`, {
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

const indexAllServices = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/services`, {
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

const fetchService = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/services/${id}`, {
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

const updateService = async (id, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/services/${id}`, {
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

const deleteService = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/services/${id}`, {
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

export default { createService,fetchService, updateService, deleteService, indexAllServices };
