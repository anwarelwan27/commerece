import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

export const TOKEN_STORAGE_KEY = "technova_token";
export const USER_STORAGE_KEY = "technova_user";

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const getStoredUser = () => {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    return null;
  }
};

export const storeSession = ({ token, user }) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getApiErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || fallbackMessage || "Something went wrong.";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  // Attach the saved JWT automatically so protected cart and checkout routes work after refresh.
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authApi = {
  register: (payload) => apiClient.post("/auth/register", payload),
  login: (payload) => apiClient.post("/auth/login", payload),
};

export const productsApi = {
  getAll: (params = {}) => apiClient.get("/products", { params }),
  getById: (id) => apiClient.get(`/products/${id}`),
  getTopRated: (params = {}) => apiClient.get("/products/top-rated", { params }),
};

export const cartApi = {
  getCart: (userId) => apiClient.get(`/cart/${userId}`),
  add: (payload) => apiClient.post("/cart", payload),
  update: (id, payload) => apiClient.put(`/cart/${id}`, payload),
  remove: (id) => apiClient.delete(`/cart/${id}`),
};

export const ordersApi = {
  checkout: () => apiClient.post("/orders"),
};

export default apiClient;
