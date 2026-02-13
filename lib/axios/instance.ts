import "server-only";

import axios, { AxiosInstance } from "axios";

// Singleton instance - dibuat sekali saja, di-reuse untuk semua request
let axiosInstanceSingleton: AxiosInstance | null = null;

const axiosInstance = (): AxiosInstance => {
  // Return existing instance jika sudah ada
  if (axiosInstanceSingleton) {
    return axiosInstanceSingleton;
  }

  // Ambil token dari environment
  const token = process.env.PUBLIC_API_TOKEN;

  // Buat instance axios dengan optimasi (hanya sekali)
  axiosInstanceSingleton = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    timeout: 10000, // 10 detik timeout - cegah request hang terlalu lama
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }), // kalau token ada
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // Optimize connection reuse - HTTP keep-alive
    maxRedirects: 5,
    // Enable HTTP keep-alive untuk connection reuse
    httpAgent: undefined, // Browser tidak perlu agent
  });

  return axiosInstanceSingleton;
};

export default axiosInstance;
