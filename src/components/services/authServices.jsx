const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const signout = () => {
  window.localStorage.removeItem("token");
};

const getUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const rawPayload = token.split(".")[1];
    const jsonPayload = window.atob(rawPayload);

    const user = JSON.parse(jsonPayload);
    return user;
  } catch (err) {
    return null;
  }
};
const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    console.log(json)
    if (json.err) {
      throw new Error(json.err);
    }
    if (json.token) {
      window.localStorage.setItem("token", json.token);

      const rawPayload = json.token.split(".")[1];
      const jsonPayload = window.atob(rawPayload);

      const user = JSON.parse(jsonPayload);
      return user;
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.token) {
      window.localStorage.setItem("token", json.token);

      const rawPayload = json.token.split(".")[1];
      const jsonPayload = window.atob(rawPayload);

      const user = JSON.parse(jsonPayload);
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  signup,
  signin,
  signout,
  getUser,
};
