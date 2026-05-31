// src/services/api.js
import axios from "axios";

// Vite uses import.meta.env, not process.env
// Variables must start with VITE_
const API_URL = import.meta.env.VITE_API_URL ;
const TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000;

const api = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || "Unknown error";
    console.error("[API Error]", message);
    return Promise.reject(new Error(message));
  }
);

export const generateSimplePDF = async (title, content) => {
  const response = await api.post(
    "/generate-pdf",
    { title, content },
    { responseType: "blob" }
  );
  return response.data;
};

export const generateAdvancedPDF = async (payload) => {
  const response = await api.post(
    "/generate-advanced-pdf",
    payload,
    { responseType: "blob" }
  );
  return response.data;
};

export default api;