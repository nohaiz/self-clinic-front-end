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
export default {
  fetchAdmin,
};
