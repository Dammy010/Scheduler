import axios from "axios";

const api = axios.create({
  baseURL: "https://scheduler-kolz.vercel.app", 
  withCredentials: true,
});

export default api;
