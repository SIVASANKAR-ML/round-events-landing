import axios from "axios";

// ?? (not ||) so empty string from .env.production is kept as-is (not replaced by fallback)
// .replace strips trailing slash to avoid double-slash when prepending to /files/ paths
const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");


const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Frappe-CSRF-Token": "fetch",
  },
});

// Fix relative Frappe file URLs in every response
api.interceptors.response.use((response) => {
  const fixUrls = (obj: unknown): unknown => {
    if (typeof obj === "string") {
      return obj.startsWith("/files/") ? `${BASE_URL}${obj}` : obj;
    }
    if (Array.isArray(obj)) return obj.map(fixUrls);
    if (obj && typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, fixUrls(v)])
      );
    }
    return obj;
  };

  response.data = fixUrls(response.data);
  return response;
});

export default api;