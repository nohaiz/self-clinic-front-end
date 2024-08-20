const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fetchAdmin = async (id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/admins/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const createAdmin = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/admins`, {
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
};

const indexAllUser = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${user}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

const deleteAdmin = async (userType, id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/${userType}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};
const updateAdmin = async (formData, id) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/admins/${id}`, {
      method: "PUT",
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
};

export default {
  fetchAdmin,
  createAdmin,
  indexAllUser,
  deleteAdmin,
  updateAdmin,
};
