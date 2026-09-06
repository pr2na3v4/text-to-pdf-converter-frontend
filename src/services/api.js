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

// NOTE: every call here uses responseType: "blob" (since a successful response
// is a PDF file). That means an ERROR response is *also* delivered as a Blob,
// not JSON — even though the backend sent `{"detail": "..."}`. Without the
// check below, error.response.data.detail is always undefined and every
// failure just shows "Unknown error". This unpacks the blob back into JSON
// when possible so real backend error messages (like the 502 AI-analysis
// failures) actually reach the UI.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = error.message || "Unknown error";
    const data = error.response?.data;

    if (data instanceof Blob) {
      try {
        const text = await data.text();
        const parsed = JSON.parse(text);
        message = parsed.detail || message;
      } catch {
        // Response wasn't JSON (e.g. a network-level failure) — keep the fallback message.
      }
    } else if (data?.detail) {
      message = data.detail;
    }

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

// AI-powered endpoint — sends raw/unstructured text, backend analyzes it via
// Groq and returns a rendered PDF blob, same shape as the other two calls.
export const generateAIPDF = async (payload) => {
  // payload shape: { raw_text, author?, organization?, filename?, include_cover?, extra_instructions? }
  const response = await api.post(
    "/generate-ai-pdf",
    payload,
    { responseType: "blob" }
  );
  return response.data;
};

export default api;