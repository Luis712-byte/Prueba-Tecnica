import axios from "axios";

const API_URL = `http://${process.env.REACT_APP_GATEWAY}`;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});
  
// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => {
//     // console.log("Interceptado Response:", response);
//     return response;
//   },
//   (error) => {
//     console.error("Error en la petición:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );


export default api;
