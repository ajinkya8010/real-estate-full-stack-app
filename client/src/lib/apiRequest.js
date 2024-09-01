import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estate-backend-620y.onrender.com",
  withCredentials: true,
});

export default apiRequest;