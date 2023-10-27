import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7006",
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = ` ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.reload('/'); // You might want to redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default instance;
export const baseURL = "https://localhost:7170";
