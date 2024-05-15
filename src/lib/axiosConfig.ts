import axios, { AxiosInstance } from "axios";
import cookie from "cookiejs";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL!,
});

// Request interceptor to inject token into headers
apiClient.interceptors.request.use((config) => {
  // Check if window exists to avoid server-side issues
  const token = typeof window !== "undefined" ? cookie.get("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
