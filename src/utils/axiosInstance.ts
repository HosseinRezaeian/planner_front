import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
