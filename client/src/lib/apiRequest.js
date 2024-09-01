import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estate-backend-j0j1.onrender.com",
  withCredentials: true,
});

export default apiRequest;