import axios from "axios";

export const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

// --- INTERCEPTOR REQUEST ---
api.interceptors.request.use(
  (config) => {
    // ERROR WAS HERE: You likely had localStorage.setItem("token")
    // CORRECTION: Use getItem to READ the token
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

export default api;