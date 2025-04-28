import axios from "axios";
import endPoints from "./urls";

const api = axios.create({
  baseURL: endPoints.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
