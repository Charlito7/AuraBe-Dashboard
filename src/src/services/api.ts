import axios from "axios";

const baseURL = process.env.VUE_APP_URI;

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;