import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800",
  withCredentials: true,
});

export default apiRequest;