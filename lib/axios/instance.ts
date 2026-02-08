import "server-only";

import axios from "axios";

const axiosInstance = () => {
  // Ambil token dari cookie

  const token = process.env.PUBLIC_API_TOKEN;
  // Buat instance axios
  const instance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }), // kalau token ada
    },
  });

  return instance;
};

export default axiosInstance;
