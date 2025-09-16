import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});
 
// si existe un token en el localStorage los añade al header del las peticiones
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
