import axios from "axios";

const api = axios.create({
  baseURL: "https://scheduler-six-blue.vercel.app",
  withCredentials: true, 
});

export default api;
